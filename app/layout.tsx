import type { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";

export const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus_jakarta_sans",
  preload: false,
});

export const metadata: Metadata = {
  title: "Vendyz",
  description:
    "Vendyz is more than just a digital transaction platform; it's a safety net designed to protect both buyers and sellers from financial loss and product theft ",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en w-full">
      <body className={`${plus_jakarta_sans.variable} antialiased`}>
        <div className="min-h-screen w-full">
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full flex flex-col">
              <Header />
              <main className="w-full flex flex-1 flex-col h-full gap-4 bg-white">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
