import { NextRequest, NextResponse } from 'next/server'
import { examService } from '@/lib/prisma'
import type { ExamDetailResponse, ExamForTakingResponse, ExamStatisticsResponse } from '@/lib/types'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'details', 'taking', 'stats'
    const { id: examId } = await context.params;

    if (!examId) {
      return NextResponse.json({
        success: false,
        error: 'Exam ID is required',
      }, { status: 400 })
    }

    switch (type) {
      case 'taking':
        // Get exam for taking (without correct answers)
        const examForTaking = await examService.getExamForTaking(examId)
        
        if (!examForTaking) {
          return NextResponse.json({
            success: false,
            error: 'Exam not found',
          }, { status: 404 })
        }

        const takingResponse: ExamForTakingResponse = {
          success: true,
          data: examForTaking,
        }

        return NextResponse.json(takingResponse)

      case 'stats':
        // Get exam statistics
        const stats = await examService.getExamStatistics(examId)
        
        const statsResponse: ExamStatisticsResponse = {
          success: true,
          data: stats,
        }

        return NextResponse.json(statsResponse)

      default:
        // Get full exam details
        const exam = await examService.getExamById(examId)
        
        if (!exam) {
          return NextResponse.json({
            success: false,
            error: 'Exam not found',
          }, { status: 404 })
        }

        const response: ExamDetailResponse = {
          success: true,
          data: exam,
        }

        return NextResponse.json(response)
    }
  } catch (error) {
    console.error('Error fetching exam:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch exam',
    }, { status: 500 })
  }
}

// PUT: Update exam
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication and authorization check
    const examId = params.id
    const body = await request.json()

    const updatedExam = await examService.prisma.exam.update({
      where: { id: examId },
      data: {
        title: body.title,
        description: body.description,
        timeLimit: body.timeLimit,
        passingScore: body.passingScore,
        isActive: body.isActive,
      },
      include: {
        _count: {
          select: {
            questions: true,
            examAttempts: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedExam,
      message: 'Exam updated successfully',
    })
  } catch (error) {
    console.error('Error updating exam:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update exam',
    }, { status: 500 })
  }
}

// DELETE: Delete exam
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication and authorization check
    const examId = params.id

    await examService.prisma.exam.delete({
      where: { id: examId },
    })

    return NextResponse.json({
      success: true,
      message: 'Exam deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting exam:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to delete exam',
    }, { status: 500 })
  }
}