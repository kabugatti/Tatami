"use client";

import Image from "next/image";
import React from "react";
import { partners } from "./partners";
import { useTranslation } from 'react-i18next';

export default function AlignedWith() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-auto bg-foreground text-secondary-foreground py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-background mb-2 md:mb-4">
            {t('alignedWith')}
          </h2>
          <p className="text-background lg:text-lg md:text-base mx-auto">
            {t('technologiesWeUse')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-background flex flex-col md:flex-row items-center gap-3 p-4 rounded-lg  transition-colors duration-200"
            >
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={partner.logo}
                  width={50}
                  height={50}
                  alt={`${partner.name} logo`}
                />
              </div>
              <div className="flex flex-col md:items-start items-center text-center md:text-left">
                <span className="text-foreground text-sm md:text-base font-semibold truncate">
                  {partner.name}
                </span>
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ backgroundColor: partner.buttonBg }} 
                  className="px-3 sm:text-sm py-1 rounded-full mt-2 md:mt-1 text-md text-foreground opacity-80 hover:opacity-100 transition-opacity w-fit whitespace-nowrap"
                >
                {t('learnMore')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
