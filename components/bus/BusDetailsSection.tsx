import Image from "next/image";
import React from "react";

interface BusDetailsSectionProps {
    title: string;
    description: React.ReactNode;
    imageUrl: string;
    imageAlt: string;
    reverse?: boolean;
}

export default function BusDetailsSection({ title, description, imageUrl, imageAlt, reverse = false }: BusDetailsSectionProps) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 border-b border-gray-100 last:border-b-0">
            <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} gap-8 items-center`}>
                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={500}
                        height={400}
                        className="w-full max-w-md h-auto object-contain"
                    />
                </div>
                <div className="w-full md:w-1/2 text-right">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h2>
                    <div className="text-gray-600 leading-8 md:leading-9 text-justify space-y-4">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}
