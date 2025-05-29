import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<Header />
			<div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
				<Image src="/images/404.svg" alt="404" width={500} height={500} />
				<Button variant="default" asChild>
					<Link href="/">Back to home</Link>
				</Button>
			</div>
		</div>
	);
}
