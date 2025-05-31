"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CourseList from "./CourseList";

export default function ProfilePage() {
	const { data } = useSession();
	const [exams, setExams] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	useEffect(() => {
		fetch(`/api/users/${session?.user?.id}/exams`)
			.then((res) => res.json())
			.then((data) => {
				setExams(data);
				setLoading(false);
			});
	}, []);
	// console.log(exams);
	return (
		<div className="flex flex-1 flex-col gap-4 p-2">
			<div className="grid auto-rows-min gap-4 ">
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
					<h1 className="text-2xl font-bold mb-5">History Exams</h1>
				</div>
				{loading ? (
					<div>Loading...</div>
				) : exams?.data?.length > 0 ? (
					<CourseList exams={exams?.data} />
				) : (
					<div>You have not taken any exams yet</div>
				)}
			</div>
		</div>
	);
}
