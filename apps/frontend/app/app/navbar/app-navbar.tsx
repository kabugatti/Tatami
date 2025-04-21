"use client";

import { Button } from "@/components/ui/button";
import logo from '@/public/Primary Logo_Primary Color.svg';
import darkLogo from '@/public/Primary Logo_Secondary Color.svg'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AppNavbar() {
  const darkmodesrc = "/darkness_6.svg";
  const lightmodesrc = "/brightness_6.svg";

  const lightModeLogo = logo;
  const darkModeLogo = darkLogo;


  const [darkMode, setDarkMode] = useState(true);
  const [logoSrc,setLogoSrc] = useState(darkModeLogo);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      setLogoSrc(lightModeLogo);
    } else {
      document.documentElement.classList.remove('dark');
      setLogoSrc(darkModeLogo);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-300 bg-neutral">
      <div className="flex h-16 items-center">
        <div className="ml-2">
          <Link href="/">
            <Image src={logoSrc} width={50} height={50} alt="Tatami logo" />
          </Link>
        </div>


      </div>
    </nav>
  );
}
