import { AppSidebar } from "@/components/tatami_sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppNavbar from "@/components/app/app-navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppNavbar />
        <SidebarProvider defaultOpen={false}>
          <div className="relative flex min-h-screen w-full overflow-x-hidden">
            <AppSidebar />
            <div 
              id="main-content"
               className="relative h-full flex-1 overflow-auto pt-16 transition-all duration-300 ease-in-out"
            >
              {children}
              <Toaster />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
