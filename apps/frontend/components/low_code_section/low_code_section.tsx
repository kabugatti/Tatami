"use client";

import React from "react";
import Image from "next/image";
import LowCode from "../../public/Group 68.svg";
import { useTranslation } from 'react-i18next';

const low_code_section = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-auto bg-black text-secondary py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
            {t('tatamiAsLowCodeTool')}
          </h2>
          <p className="text-secondary-foreground lg:text-lg md:text-base mx-auto">
            {t('tatamiProvidesLowCodeTool')}
          </p>
        </div>

        <div className="flex items-center justify-center ">
          <Image
            src={LowCode}
            width={700}
            height={700}
            alt={"low cod section"}
          />
        </div>
        {/* </div>
             ))} */}
      </div>
    </div>
  );
};

export default low_code_section;