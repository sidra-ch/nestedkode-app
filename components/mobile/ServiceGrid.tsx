

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

interface Service {
  _id: string;
  name: string;
  icon: React.ReactNode;
  route: string;
}

export default function ServiceGrid({ services }: { services: Service[] }) {
  // Sticky state
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      id="mobile-sticky-icons"
      className={`w-full flex flex-row justify-between items-center transition-all duration-300 ${
        isSticky
          ? 'fixed top-0 left-0 right-0 z-[101] bg-gradient-to-b from-[#ff6600] to-[#ff9900] shadow-md px-2 py-1'
          : 'relative mt-[-40px] bg-gradient-to-b from-[#ff6600] to-[#ff9900] shadow-orange-200 shadow-lg px-4 py-3 rounded-2xl'
      }`}
      animate={{ height: isSticky ? 56 : 88, opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label="خدمات اصلی"
      style={isSticky ? { paddingTop: 0 } : undefined}
    >
      {services.map((service) => {
        const isActive = pathname === service.route;
        return (
          <button
            key={service._id}
            className={`flex flex-col items-center justify-center px-2 py-1 focus:outline-none transition-colors ${
              isActive ? 'bg-white/20 rounded-xl shadow text-yellow-300' : ''
            }`}
            aria-label={service.name}
            onClick={() => router.push(service.route)}
          >
            <span className="flex items-center justify-center">
              {service.icon}
            </span>
            <motion.span
              className="text-xs mt-1 font-medium text-white"
              initial={false}
              animate={{ opacity: isSticky ? 0 : 1, height: isSticky ? 0 : 'auto' }}
              transition={{ duration: 0.2 }}
              style={{ display: isSticky ? 'none' : 'block' }}
            >
              {service.name}
            </motion.span>
          </button>
        );
      })}
    </motion.div>
  );
}
