"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar"

import Link from "next/link"

import {
  HomeIcon,
  LayoutDashboard,
  LogOutIcon,
  Tv2,
} from "lucide-react"

export function NavUser() {
  const { isMobile } = useSidebar()

  const handelSignOut = () => {}

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={`https://avatar.vercel.sh/RS`}
                  alt="RS"
                />
                <AvatarFallback className="rounded-lg">
                  RS
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  RS
                </span>

                <span className="text-muted-foreground truncate text-xs">
                  rahemsalah534@gmail.com
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <div className="flex items-center gap-2 border-b p-3">
              <Avatar className="h-10 w-10 rounded-lg">
                <AvatarImage
                  src={`https://avatar.vercel.sh/RS`}
                  alt="RS"
                />
                <AvatarFallback className="rounded-lg">
                  RS
                </AvatarFallback>
              </Avatar>

              <div className="grid text-sm">
                <span className="font-medium">
                  Rahem Salah
                </span>

                <span className="text-muted-foreground text-xs">
                  rahemsalah534@gmail.com
                </span>
              </div>
            </div>

            <DropdownMenuGroup>
              <DropdownMenuItem >
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem >
                <Link href="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem >
                <Link href="/admin/courses">
                  <Tv2 className="mr-2 h-4 w-4" />
                  Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handelSignOut}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}