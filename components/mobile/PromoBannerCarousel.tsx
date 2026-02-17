import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Banner {
  _id: string;
  image: string;
  text: string;
  cta: string;
  link: string;
}

export default function PromoBannerCarousel({ banners }: { banners: Banner[] }) {
  const emblaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic (robust)
  useEffect(() => {
    const container = emblaRef.current;
    if (!container) return;
    let currentIndex = 0;
    const slides = container.querySelectorAll('.promo-slide');
    const slideCount = slides.length;
    const scrollToIndex = (idx: number) => {
      const slide = slides[idx];
      if (slide) {
        (slide as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    };
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      scrollToIndex(currentIndex);
    }, 3500);
    // Reset auto-scroll if user scrolls manually
    const onUserScroll = () => {
      const scrollLeft = container.scrollLeft;
      let found = 0;
      slides.forEach((slide, idx) => {
        if ((slide as HTMLElement).offsetLeft >= scrollLeft - 10) {
          found = idx;
        }
      });
      currentIndex = found;
    };
    container.addEventListener('scroll', onUserScroll);
    return () => {
      clearInterval(interval);
      container.removeEventListener('scroll', onUserScroll);
    };
  }, [banners.length]);

  return (
    <motion.div
      className="overflow-x-auto mt-4 scrollbar-hide"
      ref={emblaRef}
      aria-label="بنرهای تبلیغاتی"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="flex gap-4 px-1 whitespace-nowrap">
        {banners.map((banner) => (
            <motion.div
              key={banner._id}
              className="promo-slide min-w-[85vw] max-w-[90vw] sm:min-w-[320px] sm:max-w-[360px] bg-yellow-100 rounded-2xl shadow-lg flex items-center justify-between p-4 whitespace-normal"
              whileHover={{ scale: 1.02 }}
            >
            <div className="flex-1 text-right pr-4">
              <h3 className="text-lg font-bold mb-2">{banner.text}</h3>
              <a href={banner.link} className="inline-block bg-orange-500 text-white rounded-lg px-4 py-2 mt-2 text-sm font-semibold">{banner.cta}</a>
            </div>
            <Image src={banner.image} alt={banner.text} width={120} height={80} className="rounded-xl object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
