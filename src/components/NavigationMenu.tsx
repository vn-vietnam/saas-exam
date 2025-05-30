"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { components } from "@/config/data";

export function NavigationMenuWrapper() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent ">Exams</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Link
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
										href="/dashboard"
									>
										<Image
											src={"/logo/logo-circle.png"}
											alt="logo"
											width={100}
											height={100}
										/>
										<div className="mb-2 mt-4 text-lg font-medium">
											Dashboard
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Complete Exam Hub: University Entrance | VSTEP | TOEIC
											Preparation
										</p>
									</Link>
								</NavigationMenuLink>
							</li>
							<ListItem href="/dashboard/grade12" title="National High School">
								University Entrance Exam Questions by Year - Grade 12
							</ListItem>
							<ListItem href="/dashboard/vstep" title="VSTEP">
								Practice Questions & Study Guide
							</ListItem>
							<ListItem href="/dashboard/toiec" title="TOIEC">
								Complete Preparation Resources
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent ">Tips and Tricks</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem >
					<NavigationMenuLink
						className={navigationMenuTriggerStyle() + " bg-transparent"}
						href="/blog"
					>
						Blog
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
