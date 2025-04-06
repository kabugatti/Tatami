"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from '@/public/Primary Logo_Primary Color.svg';
import darkLogo from '@/public/Primary Logo_Secondary Color.svg'
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

export default function AppNavbar() {
  const darkmodesrc = "/darkness_6.svg";
  const lightmodesrc = "/brightness_6.svg";

  const lightModeLogo = logo;
  const darkModeLogo = darkLogo;


  const [darkMode, setDarkMode] = useState(false);
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
    <nav className="sticky top-0 z-50 w-full transition-colors duration-300 bg-neutral">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={logoSrc} width={50} height={50} alt="Tatami logo" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button type="button"
            variant="ghost"
            onClick={toggleDarkMode}
            className="text-primary-foreground hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
            <Image
              src={darkMode ? darkmodesrc : lightmodesrc}
              width={32}
              height={32}
              alt="Theme changer"
            />
          </Button>
        </div>
      </div>
    </nav>
  );
}
