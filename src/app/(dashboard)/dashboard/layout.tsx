import { Metadata } from "next";
import { AuthCheck } from "@/components/auth-check";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboardComponent/app-sidebar";
import { SiteHeader } from "@/components/dashboardComponent/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Your personal dashboard",
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthCheck>
			<div className="">
				<SidebarProvider className="flex flex-col">
					<SiteHeader />
					<div className="flex flex-1 p-4 ">
						<AppSidebar />
						<SidebarInset>
							{children}
						</SidebarInset>
					</div>
				</SidebarProvider>
			</div>
		</AuthCheck>
	);
}
