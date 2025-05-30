
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"; // Assuming you export your PrismaClient instance directly from '@/lib/prisma'

interface UserAttemptedExamsResponse {
	success: boolean;
	data?: Array<any>; // You can define a more specific type for your exam attempts
	message?: string;
	error?: string;
}
// Lấy khóa học mà user đã tham gia
export async function GET(
	request: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const { userId } = await params;
	try {

		const userAttemptedExams = await prisma.userExamAttempt.findMany({
			where: {
				userId: userId,
			},
			include: {
				exam: {
					// Include the related Exam details for each attempt
					select: {
						// Select all fields from the Exam
						id: true,
						title: true,
						description: true,
						timeLimit: true,
						passingScore: true,
					},
				},
			},
		});
		return NextResponse.json({
			success: true,
			data: userAttemptedExams,
		});
	} catch (error) {
		console.error("Error fetching user exam attempts:", error);

		const response: UserAttemptedExamsResponse = {
			success: false,
			error: "Failed to fetch user exam attempts",
		};

		return NextResponse.json(response, { status: 500 });
	}
}
