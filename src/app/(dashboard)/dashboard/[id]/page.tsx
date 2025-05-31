"use client";

import ListCourse from "@/components/ListCourse";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamListPage() {
	const params = useParams();
	const [exams, setExams] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`/api/exams`);
				const data = await res.json();
				const filteredExams =
					data?.data?.filter((item: any) => item.type === params.id) || [];
				setExams(filteredExams);
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
	// console.log(exams);

	return (
		<div className="">
			<div className="text-2xl font-bold mb-5">
				{params.id?.toString().toUpperCase()}
			</div>
			{loading ? (
				<div>Loading...</div>
			) : exams.length === 0 ? (
				<div>No exams found.</div>
			) : (
				<ListCourse exams={exams} />
			)}
		</div>
	);
}
