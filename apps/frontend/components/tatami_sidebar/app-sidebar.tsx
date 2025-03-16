"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModelSidebarSection } from "./model-sidebar-section";
import { useSidebar } from "./useSidebar";

export function AppSidebar() {
  const { selectedOption, dynamicContent, staticMenuItems, toggleOption } =
    useSidebar();

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar
        collapsible="none"
        className="fixed left-0 top-16 h-[calc(100vh-64px)] z-[100] shadow-lg w-[60px] border-r border-primary-700"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {staticMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={selectedOption === item.id}
                    onClick={() => toggleOption(item.id)}
                    tooltip={item.label}
                    className="justify-center p-3"
                  >
                    <item.icon className="text-primary-foreground h-9 w-9" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Dynamic Sidebar - Changes based on selection */}
      {selectedOption && (
        <Sidebar
          collapsible="none"
          className="fixed left-[60px] top-16 h-[calc(100vh-64px)] z-[99] shadow-lg border-r border-primary-700 w-[350px] overflow-visible"
        >
          <SidebarContent className="h-full flex flex-col overflow-hidden">
            <SidebarGroup className="flex flex-col h-full overflow-hidden">
              <SidebarGroupLabel className="text-primary-foreground text-xl flex-shrink-0">
                {
                  staticMenuItems.find((item) => item.id === selectedOption)
                    ?.label
                }
              </SidebarGroupLabel>
              <hr />
              {selectedOption === "models" ? (
                <ModelSidebarSection />
              ) : (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {dynamicContent[
                      selectedOption as keyof typeof dynamicContent
                    ].map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton className="w-full text-base p-3">
                          {item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </div>
  );
}
