import React from "react";
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
	return (
		<div className="w-[100%] my-5 flex flex-col justify-center items-center gap-5">
			<div className="text-2xl font-bold">Exam Preparation</div>
			<div className="w-[100%] flex flex-col flex-wrap md:flex-row justify-center items-center gap-5 ">
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>VSTEP B1</CardTitle>
						<CardDescription>Master VSTEP B1 Proficiency</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View more</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>VSTEP B2</CardTitle>
						<CardDescription>Master VSTEP B2 Proficiency</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View more</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>TOEIC Proficiency</CardTitle>
						<CardDescription>Master TOEIC Proficiency</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View more</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>TOEIC Proficiency</CardTitle>
						<CardDescription>Master TOEIC Proficiency</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View more</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>TOEIC Proficiency</CardTitle>
						<CardDescription>Master TOEIC Proficiency</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View more</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>TOEIC Proficiency</CardTitle>
						<CardDescription>Master TOEIC Proficiency</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View more</Button>
					</CardContent>
				</Card>
			</div>
			<Button variant="outline">
				<Link href="/dashboard">View more</Link>
			</Button>
		</div>
	);
};

export default ListCard;
