import { useState, useEffect, useCallback } from 'react'
import type { 
  ExamWithStats, 
  ExamWithQuestions, 
  ExamForTaking,
  ExamStatistics,
  ExamFilters,
  UseExamsReturn,
  UseExamReturn
} from '@/lib/types'

// Hook for fetching multiple exams
export function useExams(initialFilters?: ExamFilters): UseExamsReturn {
  const [exams, setExams] = useState<ExamWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ExamFilters>(initialFilters || {})

  const fetchExams = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.limit) params.append('limit', filters.limit.toString())
      if (filters.offset) params.append('offset', filters.offset.toString())

      const response = await fetch(`/api/exams?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        setExams(result.data || [])
      } else {
        setError(result.error || 'Failed to fetch exams')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [filters])

  const searchExams = useCallback(async (query: string) => {
    setFilters(prev => ({ ...prev, search: query, offset: 0 }))
  }, [])

  useEffect(() => {
    fetchExams()
  }, [fetchExams])

  return {
    exams,
    loading,
    error,
    refetch: fetchExams,
    searchExams,
  }
}

// Hook for fetching single exam
export function useExam(examId: string | null): UseExamReturn {
  const [exam, setExam] = useState<ExamWithQuestions | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchExam = useCallback(async () => {
    if (!examId) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/exams/${examId}`)
      const result = await response.json()

      if (result.success) {
        setExam(result.data)
      } else {
        setError(result.error || 'Failed to fetch exam')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [examId])

  useEffect(() => {
    fetchExam()
  }, [fetchExam])

  return {
    exam,
    loading,
    error,
    refetch: fetchExam,
  }
}

// Hook for fetching exam for taking
export function useExamForTaking(examId: string | null) {
  const [exam, setExam] = useState<ExamForTaking | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchExam = useCallback(async () => {
    if (!examId) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/exams/${examId}?type=taking`)
      const result = await response.json()

      if (result.success) {
        setExam(result.data)
      } else {
        setError(result.error || 'Failed to fetch exam')
        setExam(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setExam(null)
    } finally {
      setLoading(false)
    }
  }, [examId])

  useEffect(() => {
    fetchExam()
  }, [fetchExam])

  return {
    exam,
    loading,
    error,
    refetch: fetchExam,
  }
}

// Hook for exam statistics
export function useExamStatistics(examId: string | null) {
  const [stats, setStats] = useState<ExamStatistics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    if (!examId) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/exams/${examId}?type=stats`)
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      } else {
        setError(result.error || 'Failed to fetch statistics')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [examId])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}

// Hook for submitting exam
export function useExamSubmission() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitExam = useCallback(async (examId: string, answers: { questionId: string; answerId: string }[]) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/exams/${examId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      const result = await response.json()

      if (result.success) {
        return result.data // Return attempt result
      } else {
        setError(result.error || 'Failed to submit exam')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    submitExam,
    loading,
    error,
  }
}

// Hook for debounced search
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}