import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile",
	description: "View and edit your profile",
};

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="">
			<Header />
			{children}
			<Footer />
		</div>
	);
}
