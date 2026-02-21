"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Service {
  _id: string;
  name: string;
  icon: React.ReactNode;
  route: string;
}

export default function ServiceGrid({ services }: { services: Service[] }) {
  // Sticky state
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`rounded-2xl bg-white shadow-lg p-4 flex flex-row justify-between items-center transition-all ${isSticky ? 'fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm' : 'relative mt-[-60px]'}`}
      animate={{ height: isSticky ? 56 : 120, opacity: isSticky ? 0.95 : 1 }}
      transition={{ duration: 0.3 }}
      aria-label="خدمات اصلی"
      style={isSticky ? { paddingTop: 'env(safe-area-inset-top, 0px)' } : undefined}
    >
      {services.map((service) => (
        <button
          key={service._id}
          className="flex flex-col items-center justify-center px-2 py-1 focus:outline-none"
          aria-label={service.name}
        >
          {service.icon}
          {!isSticky && <span className="text-xs mt-1 font-medium">{service.name}</span>}
        </button>
      ))}
    </motion.div>
  );
}
