"use client"

import * as React from "react"


import { NavMain } from "@/components/dashboardComponent/nav-main"
import { NavProjects } from "@/components/dashboardComponent/nav-projects"
import { NavSecondary } from "@/components/dashboardComponent/nav-secondary"
import { NavUser } from "@/components/dashboardComponent/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { data } from "@/config/data"
import { useSession } from "next-auth/react";
import Image from "next/image"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  console.log(session)
  return (
    <Sidebar
      className="top-[50px] !h-[calc(100svh-50px)]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image src={session?.user?.image || "/user.png"} alt="User Avatar" width={32} height={32}  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{session?.user?.name}</span>
                  <span className="truncate text-xs">{session?.user?.email}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
