import AppSidebar from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import UpperInfoBar from "@/components/upper-info-bar";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <UpperInfoBar />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
