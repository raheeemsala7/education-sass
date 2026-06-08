"use client"

import { BellIcon, BookOpen, HomeIcon, LayoutDashboardIcon, LogInIcon, User2Icon } from "lucide-react"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "./ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { signOut } from "next-auth/react"

const MenubarHeader = ({ first_name, last_name, role, avatar }: { first_name: string, last_name : string, role: string, avatar: string }) => {

    return (
        <>
            <Menubar className="border-none bg-transparent focus:bg-transparent">
                <MenubarMenu>
                    <MenubarTrigger className="p-0 border-none focus:outline-none bg-transparent">
                        <BellIcon className="w-6 h-6 bg-transparent" />
                    </MenubarTrigger>
                    <MenubarContent className="bg-card relative z-[155] text-start border-none rounded-xl min-h-32 flex justify-center items-center" style={{ direction: "rtl" }}>
                        <span>لا توجد اشعارات</span>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <Menubar className="border-none">
                <MenubarMenu>
                    <MenubarTrigger className="p-0 border-none focus:outline-none focus:bg-transparent">
                        <Avatar>
                            <AvatarImage src={avatar || ""} />
                            <AvatarFallback>{first_name.slice(0, 1)}{last_name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                    </MenubarTrigger>
                    <MenubarContent className="bg-card relative z-99 text-start border-none rounded-xl" style={{ direction: "rtl" }}>
                        <MenubarItem>
                            <Link href={"/me/user"} className="flex items-center gap-2">
                                <HomeIcon className="w-4 h-4 text-primary" />
                                الصفحه الرئيسيه
                            </Link>
                        </MenubarItem>
                        <MenubarItem className="ps-2">
                            <Link href={"/"}>اهلا {first_name}</Link>
                        </MenubarItem>
                        <MenubarSeparator className="h-0.5 px-2 mx-2 my-2" />
                        {role === "teacher" && (
                            <MenubarItem>
                                <Link href={"/admin"} className="flex items-center gap-2">
                                    <LayoutDashboardIcon className="w-4 h-4 text-primary" />
                                    لوحة التحكم
                                </Link>
                            </MenubarItem>
                        )}
                        <MenubarItem>
                            <Link href={"/me/user/courses"} className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-primary" />
                                كورساتي
                            </Link>
                        </MenubarItem>
                        <MenubarItem >
                            <Link href={"/me/user"} className="flex items-center gap-2">
                                <User2Icon className="w-4 h-4 text-primary" />
                                حسابي
                            </Link>
                        </MenubarItem>
                        <MenubarItem onClick={() => signOut({ callbackUrl: "/auth/login" })}>
                            <LogInIcon className="w-4 h-4 text-primary" />
                            تسجيل خروج
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </>
    )
}

export default MenubarHeader