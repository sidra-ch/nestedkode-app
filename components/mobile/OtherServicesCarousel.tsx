"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Card {
  _id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
}

export default function OtherServicesCarousel({ cards }: { cards: Card[] }) {
  const emblaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (emblaRef.current) {
      import('embla-carousel').then(({ default: EmblaCarousel }) => {
        EmblaCarousel(emblaRef.current as HTMLElement, { loop: true, align: 'start' });
      });
    }
  }, []);

  return (
    <motion.div className="overflow-x-auto" ref={emblaRef} aria-label="خدمات دیگر">
      <div className="flex gap-4 px-2">
        {cards.map((card) => (
          <Link href={card.route} key={card._id} className="min-w-[180px] max-w-[220px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-all">
            <motion.div whileHover={{ scale: 1.04 }} className="flex flex-col items-center w-full">
              <div className="mb-2">{card.icon}</div>
              <h3 className="text-base font-bold mb-1 text-center">{card.title}</h3>
              <p className="text-xs text-gray-500 text-center mb-2">{card.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
