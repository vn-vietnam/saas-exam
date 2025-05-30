import { NextRequest, NextResponse } from 'next/server'
import { examService } from '@/lib/prisma'
import type { ExamListResponse } from '@/lib/types'

// get all exams
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let exams

    if (search) {
      exams = await examService.searchExams(search)
    } else {
      exams = await examService.getAllExams()
    }

    // Apply pagination
    const paginatedExams = exams.slice(offset, offset + limit)

    const response: ExamListResponse = {
      success: true,
      data: paginatedExams,
      message: `Found ${exams.length} exams`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching exams:', error)
    
    const response: ExamListResponse = {
      success: false,
      error: 'Failed to fetch exams',
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST: Create new exam (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication and authorization check
    // const session = await getServerSession(authOptions)
    // if (!session?.user || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { title, description, timeLimit, passingScore, questions } = body

    // Validate required fields
    if (!title || !timeLimit || !questions || questions.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, timeLimit, questions'
      }, { status: 400 })
    }

    // Create exam with questions and answers in a transaction
    const result = await examService.prisma.$transaction(async (tx) => {
      // Create exam
      const exam = await tx.exam.create({
        data: {
          title,
          description,
          timeLimit,
          passingScore: passingScore || 70,
        },
      })

      // Create questions and answers
      for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i]
        const question = await tx.question.create({
          data: {
            examId: exam.id,
            questionText: questionData.questionText,
            order: i + 1,
            points: questionData.points || 1,
          },
        })

        // Create answers
        for (let j = 0; j < questionData.answers.length; j++) {
          const answerData = questionData.answers[j]
          await tx.answer.create({
            data: {
              questionId: question.id,
              answerText: answerData.answerText,
              isCorrect: answerData.isCorrect,
              order: j + 1,
            },
          })
        }
      }

      return exam
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Exam created successfully',
    })
  } catch (error) {
    console.error('Error creating exam:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create exam',
    }, { status: 500 })
  }
}