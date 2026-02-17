"use client";

import { useState, useEffect, useRef } from "react";
import { User, Plus, Minus, ChevronDown } from "lucide-react";

interface PassengerSelectorProps {
    onPassengersChange: (counts: { adult: number; child: number; infant: number }) => void;
    initialCounts?: { adult: number; child: number; infant: number };
}

export default function PassengerSelector({ onPassengersChange, initialCounts }: PassengerSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [counts, setCounts] = useState(initialCounts || { adult: 1, child: 0, infant: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onPassengersChange(counts);
    }, [counts, onPassengersChange]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const increment = (type: keyof typeof counts) => {
        setCounts((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
        }));
    };

    const decrement = (type: keyof typeof counts) => {
        if (type === "adult" && counts.adult <= 1) return;
        if (counts[type] <= 0) return;

        setCounts((prev) => ({
            ...prev,
            [type]: prev[type] - 1,
        }));
    };

    const totalPassengers = counts.adult + counts.child + counts.infant;

    return (
        <div className="relative w-full" ref={containerRef}>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 pr-1 start-0">مسافران</label>
            <div
                className="relative flex items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="absolute right-3 text-gray-400">
                    <User className="w-5 h-5" />
                </div>
                <div className="w-full h-12 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 flex items-center justify-between
                         hover:bg-gray-100 transition-all">
                    <span>{totalPassengers} مسافر</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl p-4 z-50 w-[280px]">
                    <div className="space-y-4">
                        {/* Adult */}
                        <div className="flex items-center justify-between">
                            <div className="text-right">
                                <p className="font-bold text-gray-800 text-sm">بزرگسال</p>
                                <p className="text-xs text-gray-500">۱۲ سال به بالا</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => increment("adult")}
                                    className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <span className="w-4 text-center font-bold text-gray-700">{counts.adult}</span>
                                <button
                                    onClick={() => decrement("adult")}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${counts.adult <= 1 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                                    disabled={counts.adult <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Child */}
                        <div className="flex items-center justify-between">
                            <div className="text-right">
                                <p className="font-bold text-gray-800 text-sm">کودک</p>
                                <p className="text-xs text-gray-500">۲ تا ۱۲ سال</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => increment("child")}
                                    className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <span className="w-4 text-center font-bold text-gray-700">{counts.child}</span>
                                <button
                                    onClick={() => decrement("child")}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${counts.child <= 0 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                                    disabled={counts.child <= 0}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Infant */}
                        <div className="flex items-center justify-between">
                            <div className="text-right">
                                <p className="font-bold text-gray-800 text-sm">نوزاد</p>
                                <p className="text-xs text-gray-500">۱۰ روز تا ۲ سال</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => increment("infant")}
                                    className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <span className="w-4 text-center font-bold text-gray-700">{counts.infant}</span>
                                <button
                                    onClick={() => decrement("infant")}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${counts.infant <= 0 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                                    disabled={counts.infant <= 0}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
