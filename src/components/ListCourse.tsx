import React from "react";
import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamWithStats } from "@/lib/types";
import { ClockIcon, HelpCircleIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
const ListCourse = ({ exams }: { exams: ExamWithStats[] }) => {
	// console.log(exams);
	return (
		<div className="w-[100%] flex flex-col justify-center items-center gap-5">
			<div className="w-[100%] flex flex-row flex-wrap justify-start items-center gap-5 ">
				{exams?.map((exam) => (
					<Card
						key={exam.id}
						className="md:w-[350px] w-full hover:border-1 hover:border-slate-300"
					>
						<CardHeader>
							<CardTitle>{exam.title}</CardTitle>
							<CardDescription className="text-sm flex flex-col gap-2">
								<div className="text-sm h-10 ">{exam.description}</div>
								<div className="text-sm flex flex-row justify-start items-center gap-2">
									<ClockIcon className="w-4 h-4" />
									<div className="text-sm">{exam.timeLimit}mins</div>
								</div>
								<div className="text-sm flex flex-row justify-start items-center gap-2">
									<HelpCircleIcon className="w-4 h-4" /> {exam._count.questions}{" "}
									questions
								</div>
								<div className="text-sm flex flex-row justify-start items-center gap-2">
									<UsersIcon className="w-4 h-4" /> {exam._count.examAttempts}{" "}
									participants
								</div>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" disabled={!exam.isActive} asChild>
								<Link href={`/dashboard/exams/${exam.id}`}>View Exam</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ListCourse;
