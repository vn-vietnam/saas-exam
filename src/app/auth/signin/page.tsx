import { Metadata } from "next";
import Link from "next/link";
import { UserSignInForm } from "@/components/auth/user-sign-in-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Sign In",
	description: "Sign in to your account",
};

export default function SignInPage() {
	return (
		<div className=" h-screen flex justify-center items-center px-5 md:px-0" style={{
			backgroundImage: "url('/main-images/bg-banner.jpg')",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundColor: "rgba(0, 0, 0, 0.7)",
			backgroundBlendMode: "darken",
		}}>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] text-white">
					<div className="flex flex-col space-y-2 text-center">
						<Link href={"/"} className="flex justify-center">
							<Image src={"/logo/logo-circle.png"} alt="logo" width={100} height={100} />	
						</Link>
						<div className="text-2xl font-bold text-center pt-2">Login</div>
					</div>
					<UserSignInForm />
					<p className="px-8 text-center text-sm text-gray-400">
						Don&apos;t have an account?{" "}
						<Button variant="link" className="p-0 h-auto" asChild>
							<Link href={"/auth/register"} className="text-white">Sign up</Link>
						</Button>
					</p>
				</div>
			</div>
		</div>
	);
}
