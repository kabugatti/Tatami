"use client";

import Link from "next/link";
import { useTranslation } from 'react-i18next';

export const FooterBottom = () => {
  const { t } = useTranslation();
  return (
    <div className="border-t border-white/40 pt-6 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
        <Link
          href="/privacy-policy"
          className="text-primary-foreground text-lg hover:text-primary transition-colors"
        >
          {t('privacyPolicy')}
        </Link>
        <span className="text-primary-foreground/40">|</span>
        <Link
          href="/terms"
          className="text-primary-foreground text-lg hover:text-primary transition-colors"
        >
          {t('termsOfService')}
        </Link>
      </div>
      <div className="text-primary-foreground text-lg">
        <Link href="https://github.com/KaizeNodeLabs">
          2025 <span className="font-semibold">Kaizenode Labs</span>
        </Link>
      </div>
    </div>
  );
};
