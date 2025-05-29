"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const name = formData.get("name") as string;

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || "Something went wrong");
			}

			// Redirect to login page after successful registration
			router.push("/auth/signin");
		} catch (error) {
			setError(error instanceof Error ? error.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className=" flex h-screen items-center justify-center px-5 md:px-0" style={{
			backgroundImage: "url('/main-images/bg-banner.jpg')",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundColor: "rgba(0, 0, 0, 0.7)",
			backgroundBlendMode: "darken",
		}}>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] text-white">
				<Link href={"/"} className="flex justify-center">
					<Image src={"/logo/logo-circle.png"} alt="logo" width={100} height={100} />	
				</Link>
				<div className="text-2xl font-bold text-center">Register</div>
				<form onSubmit={onSubmit}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Name</Label>
							<Input id="name" name="name" placeholder="Enter your name" required className="text-white placeholder:text-gray-400"/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Enter your email"
								required
								className="text-white placeholder:text-gray-400"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" placeholder="Enter your password" required className="text-white placeholder:text-gray-400" />
						</div>
					</div>

					<div className="flex flex-col gap-4 pt-4">
						<Button className="w-full" type="submit" disabled={loading} variant="secondary">
							{loading ? "Creating account..." : "Create account"}
						</Button>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<p className="px-8 text-center text-sm text-gray-400">
							Already have an account?{" "}
							<Button variant="link" className="p-0 h-auto" asChild>
								<Link href={"/auth/signin"} className="text-white">Sign in</Link>  
							</Button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
