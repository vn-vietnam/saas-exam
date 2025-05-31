"use client";

import { SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/dashboardComponent/search-form";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
export function SiteHeader() {
	const { toggleSidebar } = useSidebar();

	return (
		<header className="flex sticky top-0  z-50 w-full items-center border-b bg-background">
			<div className="flex h-[50px] w-full items-center gap-2 px-4">
				<Button
					className="h-8 w-8"
					variant="ghost"
					size="icon"
					onClick={toggleSidebar}
				>
					<SidebarIcon />
				</Button>
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb className="hidden sm:block">
					<BreadcrumbList>
						<BreadcrumbItem>
							<Link href="/">Home</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>
								<Link href="/dashboard">Exams</Link>
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<SearchForm className="w-full sm:ml-auto sm:w-auto" />
			</div>
		</header>
	);
}
