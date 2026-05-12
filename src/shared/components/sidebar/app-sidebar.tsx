"use client"

import * as React from "react"
import Logo from "@/public/logo.png";



import { NavUser } from "@/shared/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import Link from "next/link"
import { BookDashed, LayoutDashboardIcon, PlusCircle, Users } from "lucide-react";

const data = {
  navMain: [
    {
      title: "لوحة التحكم",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "كورسات",
      url: "/admin/courses",
      icon: BookDashed,
    },
    {
      title: "المستخدمين",
      url: "/admin/users",
      icon: Users,
    }

  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" side="right" className="bg-card" {...props}>
      <SidebarHeader className="bg-card">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5 !h-auto bg-card hover:!bg-transparent"
            >
              <Link href={"/"} className="flex items-center group cursor-pointer w-full">
                <LayoutDashboardIcon className="size-16 animate-pulse" />
                <span className="text-2xl">لوحة التحكم</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">

                <SidebarMenuButton
                  tooltip="Quick Create"
                >
                  <Link href={"/admin//courses/create"} className="flex w-full items-center gap-3  w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105  relative overflow-hidden group">
                    <PlusCircle />
                    <span className="relative z-10">Quick Create</span>
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                  </Link >
                </SidebarMenuButton>



              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} >
                    <Link className="w-full flex gap-4 items-center" href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
