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
    <>
      {/* Sidebar principal fijo */}
      <Sidebar
        collapsible="none"
        className="fixed left-0 top-16 h-[calc(100vh-64px)] z-[100] shadow-lg w-[60px] border-r border-background"
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
                    <item.icon
                      className="text-primary-foreground h-9 w-9"
                      style={{ color: "#f7c618" }}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Sidebar dinámico con transición */}
      <div
        className={`fixed left-[60px] top-16 h-[calc(100vh-64px)] z-[99] transition-all duration-300 ease-in-out ${
          selectedOption ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <Sidebar
          collapsible="none"
          className="h-full shadow-lg border-r border-primary-700 w-[350px] bg-neutral"
        >
          <SidebarContent className="h-full flex flex-col overflow-hidden">
            <SidebarGroup className="flex flex-col h-full overflow-hidden">
              <SidebarGroupLabel className="text-foreground text-xl flex-shrink-0">
                {staticMenuItems.find((item) => item.id === selectedOption)?.label}
              </SidebarGroupLabel>
              <hr />
              {selectedOption === "models" ? (
                <ModelSidebarSection />
              ) : (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {dynamicContent[
                      selectedOption as keyof typeof dynamicContent
                    ]?.map((item) => (
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
      </div>
    </>
  );
}
