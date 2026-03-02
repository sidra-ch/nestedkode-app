"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface BusFAQAccordionProps {
    faqs: FAQItem[];
}

export default function BusFAQAccordion({ faqs }: BusFAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-right">
                سوالات متداول بلیط اتوبوس
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-100 last:border-b-0"
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex items-center justify-between p-5 md:p-6 text-right hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                        >
                            <div className="flex items-center text-gray-500">
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5" />
                                ) : (
                                    <ChevronDown className="h-5 w-5" />
                                )}
                            </div>
                            <span className="font-semibold text-gray-800 text-sm md:text-base pr-4">
                                {faq.question}
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="p-5 md:p-6 bg-gray-50 text-gray-600 text-sm md:text-base text-right leading-loose pt-0">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
