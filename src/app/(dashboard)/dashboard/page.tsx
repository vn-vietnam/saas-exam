"use client";

import Image from "next/image";

export default function DashboardPage() {
	return (
		<div className="flex justify-center items-center h-full">
			<Image
				src="/logo/logo-circle.png"
				alt="User Avatar"
				width={300}
				height={300}
			/>
		</div>
	);
}
