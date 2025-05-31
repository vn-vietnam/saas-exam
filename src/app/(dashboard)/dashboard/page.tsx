"use client";

import ListCourse from "@/components/ListCourse";
import { useEffect, useState } from "react";

export default function DashboardPage() {
	const [exams, setExams] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`/api/exams`)
			.then((res) => res.json())
			.then((data) => {
				setExams(data);
				setLoading(false);
			});
	}, []);
	// console.log(exams);


	return (
		<div className="">
			<div className="text-2xl font-bold mb-5">Exam Preparation</div>
			<ListCourse exams={exams?.data} />
		</div>
	);
}
