"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, MessageCircle, Navigation, MapPin } from 'lucide-react';

interface Branch {
    _id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    latitude: number;
    longitude: number;
    isMainBranch: boolean;
}

interface BranchesMapProps {
    branches: Branch[];
    selectedBranchId?: string;
    onBranchSelect?: (branch: Branch) => void;
    className?: string;
}

// Custom icons to match previous design and fix Leaflet default icon issues in Next.js
const mainBranchIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/gold-dot.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
});

const regularBranchIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
});

// Component to handle map view updates
function MapController({ selectedBranch, branches }: { selectedBranch: Branch | null, branches: Branch[] }) {
    const map = useMap();

    useEffect(() => {
        if (selectedBranch) {
            map.setView([selectedBranch.latitude, selectedBranch.longitude], 15, {
                animate: true
            });
        } else if (branches.length > 0) {
            const bounds = L.latLngBounds(branches.map(b => [b.latitude, b.longitude]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [selectedBranch, branches, map]);

    return null;
}

const BranchesMap: React.FC<BranchesMapProps> = ({
    branches,
    selectedBranchId,
    onBranchSelect,
    className = "h-[500px] w-full"
}) => {
    const [selectedMarker, setSelectedMarker] = useState<Branch | null>(null);

    // Sync selected marker when selectedBranchId changes from parent
    useEffect(() => {
        if (selectedBranchId) {
            const branch = branches.find(b => b._id === selectedBranchId);
            if (branch) setSelectedMarker(branch);
        }
    }, [selectedBranchId, branches]);

    const defaultCenter: [number, number] = [34.5553, 69.2075]; // Kabul

    return (
        <div className={`${className} relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 z-10`}>
            <MapContainer
                center={defaultCenter}
                zoom={6}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController selectedBranch={selectedMarker} branches={branches} />

                {branches.map((branch) => (
                    <Marker
                        key={branch._id}
                        position={[branch.latitude, branch.longitude]}
                        icon={branch.isMainBranch ? mainBranchIcon : regularBranchIcon}
                        eventHandlers={{
                            click: () => {
                                setSelectedMarker(branch);
                                if (onBranchSelect) onBranchSelect(branch);
                            },
                        }}
                    >
                        <Popup minWidth={200}>
                            <div className="p-2 text-right" dir="rtl">
                                <h3 className="font-bold text-[#002855] mb-1">{branch.name}</h3>
                                <p className="text-xs text-gray-600 mb-3">{branch.address}</p>

                                <div className="flex flex-col gap-2">
                                    <a
                                        href={`https://wa.me/${branch.whatsapp.replace(/\s+/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-3 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors no-underline"
                                    >
                                        <MessageCircle size={14} />
                                        واتس‌اپ
                                    </a>

                                    <div className="flex gap-2">
                                        <a
                                            href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                                            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors no-underline"
                                        >
                                            <Phone size={14} />
                                            تماس
                                        </a>
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-white py-2 px-3 rounded-lg text-xs font-bold hover:bg-[#B08D26] transition-colors no-underline"
                                        >
                                            <Navigation size={14} />
                                            مسیریابی
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BranchesMap;
