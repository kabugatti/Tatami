"use client";
import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img
              src="/Primary Logo_Primary Color.svg"
              alt="Logo"
              className="h-14 w-auto"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden items-center space-x-6 text-sm font-medium lg:flex">
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80 text-white"
            >
              Docs
            </Link>
            <Link
              href="/community"
              className="transition-colors hover:text-foreground/80 text-white"
            >
              Community
            </Link>
            <Link
              href="/build"
              className="transition-colors hover:text-foreground/80 text-white"
            >
              {"Let's build"}
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden text-white"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black"
              aria-label="Navigation Menu" // Added aria-label here
            >
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/docs"
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-white"
                >
                  Docs
                </Link>
                <Link
                  href="/community"
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-white"
                >
                  Community
                </Link>
                <Link
                  href="/build"
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-white"
                >
                  {"Let's build"}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
