"use client";

import { Button } from "@/components/ui/button";
import {
	BookCheck,
	BookOpenIcon,
	ClockIcon,
	HelpCircleIcon,
	LineChartIcon,
	Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleExamPage() {
	const params = useParams();
	const [exam, setExam] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`/api/exams/${params.id}`);
				const data = await res.json();
				setExam(data?.data);
			} catch (error) {
				console.error("Error fetching exams:", error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchData();
		}
	}, [params.id]);
	// console.log(exam);

	return (
		<div className="">
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<Loader2 className="w-4 h-4 animate-spin" />
				</div>
			) : (
				<>
					<div className="text-2xl font-bold mb-5">{exam?.title}</div>
					<div className="text-sm mb-5 flex flex-row items-center gap-2">
						<HelpCircleIcon className="w-4 h-4" /> {exam?.description}
					</div>
					<div className="text-sm mb-5 flex flex-row items-center gap-2">
						<ClockIcon className="w-4 h-4" /> {exam?.timeLimit} minutes
					</div>
					<div className="text-sm mb-5 flex flex-row items-center gap-2">
						<BookOpenIcon className="w-4 h-4" /> {exam?.questions.length}{" "}
						questions
					</div>
					<div className="text-sm mb-5 flex flex-row items-center gap-2">
						<LineChartIcon className="w-4 h-4" /> Passing Score:{" "}
						{exam?.passingScore}
					</div>
					<div className="text-sm mb-5 flex flex-row items-center gap-2">
						<BookCheck className="w-4 h-4" /> Exam Type:{" "}
						{exam?.type.toUpperCase()}
					</div>
					<div className="text-sm mb-5 flex flex-row items-center gap-2">
						<Button variant="outline" disabled={!exam?.isActive}>
							Start Exam
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
