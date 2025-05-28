"use client";

import React from "react";
import { SignIn } from "@/components/auth-components";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
	const { data: session } = useSession();
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.push("/auth/signin");
	};

	// if (!session?.user) return;

	return (
		<header className="flex border-b justify-between items-center px-5 h-16 ">
			<div>
				<Image src={"/next.svg"} alt="logo" width={100} height={100} />
			</div>
			<div>
				{session ? ( 
					<div className="flex gap-2">
						{/* <span>Welcome, {session?.user?.name}</span> */}
						<Image
							src={session?.user?.image || "/user.png"}
							alt="User Avatar"
							width={32}
							height={32}
							className="rounded-full"
						/>
						<Button onClick={handleSignOut}>Sign Out</Button>
					</div>
				) : (
					<div className="flex items-center">
						<Link href="/auth/signin">
							<Button variant="outline">Sign In</Button>
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;
