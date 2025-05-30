import { NextRequest, NextResponse } from 'next/server';
import { examService } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await context.params;
	console.log(userId);
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Fetch exams created by this user (or based on your logic)
    const exams = await examService.getExamsFromUserId(userId);
	
    return NextResponse.json({
      success: true,
      data: exams,
    });
  } catch (error) {
    console.error('Error fetching exams by user:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch exams for user',
    }, { status: 500 });
  }
}
