"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Overview",
    url: "/",
    icon: "/sidebar-icons/overview.svg",
  },
  {
    title: "Users",
    url: "#",
    icon: "/sidebar-icons/users.svg",
  },
  {
    title: "Transactions",
    url: "#",
    icon: "/sidebar-icons/transactions.svg",
  },
  {
    title: "Orders",
    url: "#",
    icon: "/sidebar-icons/orders.svg",
  },
  {
    title: "Disputes",
    url: "#",
    icon: "/sidebar-icons/disputes.svg",
  },
  {
    title: "Notifications",
    url: "#",
    icon: "/sidebar-icons/notifications.svg",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="py-4">
      <SidebarHeader className="mx-auto mt-[6px] mb-[28px]">
        <Image
          src="/sidebar-icons/logo.svg"
          width={40}
          height={40}
          alt="logo"
        />
      </SidebarHeader>
      <SidebarContent className="space-y-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`py-[10px] ${
                    pathname.includes(item.url)
                      ? "border-l-4 border-[#5271FF]"
                      : ""
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={20}
                        height={20}
                      />
                      <span className="text-sm font-medium text-[#9b9697]">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/sidebar-icons/admin.svg"
              width={32}
              height={32}
              alt="admin"
            />
            <SidebarGroup>
              <p className="text-sm text-[#232322] font-medium">
                Emmanuel Israel
              </p>
              <small className="text-[#9b9697] text-sm font-normal">
                Admin
              </small>
            </SidebarGroup>
          </div>
          <Image
            src="/sidebar-icons/circle.svg"
            width={20}
            height={20}
            alt="circle"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
