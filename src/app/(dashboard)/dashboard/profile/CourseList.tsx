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
	// console.log(exams);
	dayjs.extend(advancedFormat);
	return (
		<div className="w-[100%] my-5 flex flex-col justify-center items-center gap-5">
			<div className="w-[100%] flex flex-row flex-wrap justify-start items-center gap-5 ">
				{exams?.exams?.map((exam: any) => (
					<Card className={`w-[100%] md:w-[350px] hover:shadow-md hover:shadow-slate-300 transition-all duration-300 ${exam?.isPassed ? "border-green-500" : "border-red-500"} border-1`} key={exam?.id}>
						<CardHeader>
							<CardTitle>{exam?.exam?.title}</CardTitle>
							<CardDescription className="text-sm flex flex-col gap-1">
								<div className={`${exam?.isPassed ? "text-green-500" : "text-red-500"}`}>
									Last Score: {exam?.score?.toFixed(2)}/
									{exam?.exam?.passingScore}
								</div>
								<div>Status: {exam?.isPassed ? "Passed" : "Failed"}</div>
								<div>Date: {dayjs(exam?.startTime).format("DD/MM/YYYY")}</div>
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
