"use client";

import { AuthCheck } from "@/components/auth-check";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboardComponent/app-sidebar";
import { SiteHeader } from "@/components/dashboardComponent/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function DashboardPage() {

	return (
		<AuthCheck>
			<div className="">
				<SidebarProvider className="flex flex-col">
					<SiteHeader />
					<div className="flex flex-1 p-4 ">
						<AppSidebar/>
						<SidebarInset>
							<div className="flex flex-1 flex-col gap-4 ">
								<div className="grid auto-rows-min gap-4 md:grid-cols-3">
									<div className="aspect-video rounded-xl bg-muted/50" />
									<div className="aspect-video rounded-xl bg-muted/50" />
									<div className="aspect-video rounded-xl bg-muted/50" />
								</div>
								<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
							</div>
						</SidebarInset>
					</div>
				</SidebarProvider>
			</div>
		</AuthCheck>
	);
}
