import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper functions for common queries
export const examService = {
	// Get all active exams
	async getAllExams() {
		return await prisma.exam.findMany({
			where: {
				// check if the exam is active
				// isActive: true,
			},
			include: {
				_count: {
					select: {
						questions: true,
						examAttempts: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	},

	// Get exam by ID with questions and answers
	async getExamById(id: string) {
		return await prisma.exam.findUnique({
			where: {
				id,
				// isActive: true,
			},
			include: {
				questions: {
					include: {
						answers: {
							orderBy: {
								order: "asc",
							},
						},
					},
					orderBy: {
						order: "asc",
					},
				},
				_count: {
					select: {
						examAttempts: true,
					},
				},
			},
		});
	},

	// Get exam for taking (without correct answers)
	async getExamForTaking(id: string) {
		return await prisma.exam.findUnique({
			where: {
				id,
				// isActive: true,
			},
			include: {
				questions: {
					include: {
						answers: {
							select: {
								id: true,
								answerText: true,
								order: true,
								// Don't include isCorrect when taking exam
							},
							orderBy: {
								order: "asc",
							},
						},
					},
					orderBy: {
						order: "asc",
					},
				},
			},
		});
	},

	// custom



	// custom

	// Get user's exam attempts
	async getUserExamAttempts(userId: string, examId?: string) {
		return await prisma.userExamAttempt.findMany({
			where: {
				userId,
				...(examId && { examId }),
			},
			include: {
				exam: {
					select: {
						id: true,
						title: true,
						passingScore: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	},

	// Get exam attempt with answers
	async getExamAttemptById(attemptId: string, userId: string) {
		return await prisma.userExamAttempt.findFirst({
			where: {
				id: attemptId,
				userId,
			},
			include: {
				exam: {
					include: {
						questions: {
							include: {
								answers: true,
							},
							orderBy: {
								order: "asc",
							},
						},
					},
				},
				userAnswers: {
					include: {
						question: true,
						answer: true,
					},
				},
			},
		});
	},

	// Get exam statistics
	async getExamStatistics(examId: string) {
		const attempts = await prisma.userExamAttempt.findMany({
			where: {
				examId,
				status: "completed",
				score: {
					not: null,
				},
			},
		});

		const totalAttempts = attempts.length;
		const passedAttempts = attempts.filter(
			(attempt) => attempt.isPassed
		).length;
		const scores = attempts
			.map((attempt) => attempt.score)
			.filter((score) => score !== null);

		const averageScore =
			scores.length > 0
				? scores.reduce((sum, score) => sum + score, 0) / scores.length
				: 0;

		const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
		const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;
		const passRate =
			totalAttempts > 0 ? (passedAttempts / totalAttempts) * 100 : 0;

		return {
			totalAttempts,
			passedAttempts,
			averageScore: Math.round(averageScore * 100) / 100,
			highestScore,
			lowestScore,
			passRate: Math.round(passRate * 100) / 100,
		};
	},

	// Search exams
	async searchExams(query: string) {
		return await prisma.exam.findMany({
			where: {
				isActive: true,
				OR: [
					{
						title: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						description: {
							contains: query,
							mode: "insensitive",
						},
					},
				],
			},
			include: {
				_count: {
					select: {
						questions: true,
						examAttempts: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	},
};
