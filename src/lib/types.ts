import type { Exam, Question, Answer, User, UserExamAttempt, UserAnswer } from '@prisma/client'

// Extended types with relations
export type ExamWithStats = Exam & {
  _count: {
    questions: number
    examAttempts: number
  }
}

export type ExamWithQuestions = Exam & {
  questions: (Question & {
    answers: Answer[]
  })[]
  _count: {
    examAttempts: number
  }
}

export type ExamForTaking = Exam & {
  questions: (Question & {
    answers: Pick<Answer, 'id' | 'answerText' | 'order'>[]
  })[]
}

export type ExamAttemptWithDetails = UserExamAttempt & {
  exam: {
    id: string
    title: string
    passingScore: number
  }
}

export type ExamAttemptWithAnswers = UserExamAttempt & {
  exam: ExamWithQuestions
  userAnswers: (UserAnswer & {
    question: Question
    answer: Answer | null
  })[]
}

export type ExamStatistics = {
  totalAttempts: number
  passedAttempts: number
  averageScore: number
  highestScore: number
  lowestScore: number
  passRate: number
}

// API Response types
export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type ExamListResponse = ApiResponse<ExamWithStats[]>
export type ExamDetailResponse = ApiResponse<ExamWithQuestions>
export type ExamForTakingResponse = ApiResponse<ExamForTaking>
export type ExamAttemptsResponse = ApiResponse<ExamAttemptWithDetails[]>
export type ExamStatisticsResponse = ApiResponse<ExamStatistics>

// Form types
export type SubmitExamData = {
  examId: string
  answers: {
    questionId: string
    answerId: string
  }[]
  timeSpent?: number
}

export type ExamFilters = {
  search?: string
  sortBy?: 'title' | 'createdAt' | 'attempts'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

// Component props types
export type ExamCardProps = {
  exam: ExamWithStats
  showStats?: boolean
  onExamClick?: (examId: string) => void
}

export type ExamListProps = {
  exams: ExamWithStats[]
  loading?: boolean
  error?: string | null
  filters?: ExamFilters
  onFiltersChange?: (filters: ExamFilters) => void
}

export type ExamDetailsProps = {
  exam: ExamWithQuestions
  userAttempts?: ExamAttemptWithDetails[]
  canTakeExam?: boolean
  onStartExam?: () => void
}

// Hook return types
export type UseExamsReturn = {
  exams: ExamWithStats[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  searchExams: (query: string) => Promise<void>
}

export type UseExamReturn = {
  exam: ExamWithQuestions | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export type UseExamAttemptReturn = {
  attempt: ExamAttemptWithAnswers | null
  loading: boolean
  error: string | null
  submitExam: (data: SubmitExamData) => Promise<boolean>
}