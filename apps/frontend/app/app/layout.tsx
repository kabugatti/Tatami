'use client'
import { AppSidebar } from "@/app/app/tatami_sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppNavbar from "@/app/app/navbar/app-navbar";
import { useState } from "react";
import AppPage from "./page";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mainContent, setMainContent] = useState<React.ReactNode>(<AppPage />); 

  return (
    <html lang="en" className="dark">
      <body>
        <AppNavbar />
        <SidebarProvider defaultOpen={false} className="overflow-hidden">
          <div className="relative flex  w-full overflow-x-hidden">
            <AppSidebar setMainContent={setMainContent}/>
            <div 
              id="main-content"
               className="relative  flex-1 h-full overflow-auto pt-5 transition-all duration-300 ease-in-out"
            >
               {mainContent}
              <Toaster />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}


