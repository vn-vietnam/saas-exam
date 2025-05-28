"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavigationMenuWrapper } from "./NavigationMenu";
import { DropdownMenuWrapper } from "./DropdownMenu";


function Header() {
	const { data: session } = useSession();
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.push("/auth/signin");
	};

	return (
		<header className="flex border-b justify-between items-center px-5 h-16 ">
			<div>
				<Image src={"/next.svg"} alt="logo" width={100} height={100} className="w-20 h-20"/>
			</div>
			<div className="hidden md:block">
				<NavigationMenuWrapper />
			</div>
			<div className="md:hidden">
				<DropdownMenuWrapper session={session} />
			</div>
			<div className="hidden md:block">
				{session ? (
					<div className="flex gap-2 items-center">
						{/* <span>Welcome, {session?.user?.name}</span> */}
						<Image
							src={session?.user?.image || "/user.png"}
							alt="User Avatar"
							width={32}
							height={32}
							className="rounded-full"
						/>
						<Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
					</div>
				) : (
					<div className="flex items-center">
						<Link href="/auth/signin">
							<Button  variant="outline">Sign In</Button>
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;
