"use client";
import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
const ListCard = () => {
	const [exams, setExams] = useState<any>(null);
	useEffect(() => {
		fetch(`/api/exams`)
			.then((res) => res.json())
			.then((data) => {
				setExams(data);
			});
	}, []);
	// console.log(exams);
	return (
		<div className="w-[100%] my-5 flex flex-col justify-center items-center gap-5">
			<div className="text-2xl font-bold">Exam Preparation</div>
			<div className="w-[100%] flex flex-col flex-wrap md:flex-row justify-center items-center gap-5 px-5">
				{exams?.data?.slice(0, 4)?.map((exam: any) => (
					<Card
						className="w-[100%] sm:w-[350px] hover:shadow-lg transition-all duration-300"
						key={exam?.id}
					>
						<CardHeader>
							<CardTitle>{exam?.title}</CardTitle>
							<CardDescription>
								{exam?.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline">
								<Link href={`/dashboard/${exam?.id}`}>View more</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
			<Button variant="outline">
				<Link href="/dashboard">View more</Link>
			</Button>
		</div>
	);
};

export default ListCard;
