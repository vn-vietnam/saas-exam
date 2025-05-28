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
		<div className=" h-screen flex justify-center items-center px-5 md:px-0">
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<div className="flex justify-center">
							<Image src={"/next.svg"} alt="logo" width={100} height={100} />	
						</div>
					</div>
					<UserSignInForm />
					<p className="px-8 text-center text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Button variant="link" className="p-0 h-auto" asChild>
							<Link href={"/auth/register"}>Sign up</Link>
						</Button>
					</p>
				</div>
			</div>
		</div>
	);
}
