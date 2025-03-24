import { AppSidebar } from "@/components/tatami_sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={false}>
          <div className="relative flex min-h-screen w-full overflow-x-hidden">
            <AppSidebar />
            <div 
              id="main-content"
              className="relative flex-1 w-full pt-16 transition-all duration-300 ease-in-out"
              style={{
                marginLeft: "60px"
              }}
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
