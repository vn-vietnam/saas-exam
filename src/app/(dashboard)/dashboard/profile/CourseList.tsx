import React from "react";
import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const ListCourse = () => {
	return (
		<div className="w-[100%] my-5 flex flex-col justify-center items-center gap-5">
			<div className="w-[100%] flex flex-row flex-wrap justify-start items-center gap-5 ">
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Toiec 650</CardTitle>
						<CardDescription className="text-sm">
							Last Score: 360/990
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View Exam</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Toiec 350</CardTitle>
						<CardDescription className="text-sm">
							Last Score: 200/990
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View Exam</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Vstep Exam 1</CardTitle>
						<CardDescription className="text-sm">
							Last Score: 7.33/10
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View Exam</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Vstep Exam 2</CardTitle>
						<CardDescription className="text-sm">
							Last Score: 2/10
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View Exam</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Sat Exam 1</CardTitle>
						<CardDescription className="text-sm">
							Last Score: 100/1600
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline">View Exam</Button>
					</CardContent>
				</Card>
				
			</div>
		</div>
	);
};

export default ListCourse;
