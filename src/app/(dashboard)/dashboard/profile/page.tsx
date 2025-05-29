"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Image from "next/image";
import CourseList from "./CourseList";

export default function ProfilePage() {
	const { data } = useSession();
	console.log(data);
	return (
		<div className="flex flex-1 flex-col gap-4 p-2">
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<div className=" rounded-xl">
					<div className="flex flex-row items-start  gap-2 w-full h-full">
						<Image
							src={data?.user?.image || "/images/user.png"}
							alt="User Avatar"
							width={100}
							height={100}
							className="rounded-full"
						/>
						<Separator orientation="vertical" className="h-[100px]" />
						<div className="flex flex-col items-start gap-2">
							<h1>Name: {data?.user?.name}</h1>
							<p>Email: {data?.user?.email}</p>
							<Button variant="outline">Edit Profile</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
				<div>
					<h1 className="text-2xl font-bold">Exams</h1>
				</div>
				<CourseList />
			</div>
		</div>
	);
}
