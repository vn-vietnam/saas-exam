import Link from 'next/link'
import { Clock, Users, BookOpen, Award } from 'lucide-react'
import type { ExamWithStats } from '@/lib/types'

interface ExamCardProps {
  exam: ExamWithStats
  showStats?: boolean
  className?: string
}

export function ExamCard({ exam, showStats = true, className = '' }: ExamCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <Link 
                href={`/exams/${exam.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {exam.title}
              </Link>
            </h3>
            {exam.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {exam.description}
              </p>
            )}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            exam.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {exam.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{exam.timeLimit} minutes</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{exam._count.questions} questions</span>
          </div>
          {showStats && (
            <>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{exam._count.examAttempts} attempts</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Award className="w-4 h-4 mr-2" />
                <span>{exam.passingScore}% to pass</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link
            href={`/exams/${exam.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
          <Link
            href={`/exams/${exam.id}/take`}
            className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Take Exam
          </Link>
        </div>
      </div>
    </div>
  )
}

// Skeleton loading component
