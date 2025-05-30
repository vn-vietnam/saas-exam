"use client";
import React from "react";
import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

const ListCourse = (exams: any) => {
	dayjs.extend(advancedFormat);
	// console.log(exams);
	return (
		<div className="w-[100%] my-5 flex flex-col justify-center items-center gap-5">
			<div className="w-[100%] flex flex-row flex-wrap justify-start items-center gap-5 ">
				{exams?.exams?.map((exam: any) => (
					<Card className="w-[100%] md:w-[350px]" key={exam?.id}>
						<CardHeader>
							<CardTitle>{exam?.exam?.title}</CardTitle>
							<CardDescription className="text-sm">
								<div>Last Score: {exam?.score}</div>
								<div>
									Date: {dayjs(exam?.startTime).format("DD/MM/YYYY")}
								</div>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline">View Exam</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ListCourse;
