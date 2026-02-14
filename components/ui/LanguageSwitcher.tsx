"use client";

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Language, t, setLanguage } from '@/lib/i18n';

const languages = [
  { code: 'fa' as Language, name: 'فارسی', flag: '🇦🇫' },
  { code: 'ps' as Language, name: 'پښتو', flag: '🇦🇫' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('fa');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['fa', 'ps', 'en'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    setLanguage(lang);
    setIsOpen(false);
    window.location.reload();
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-right text-sm hover:bg-gray-50 ${
                  currentLang === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
