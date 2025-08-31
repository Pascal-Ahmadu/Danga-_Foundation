import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Add a check for build time
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not available during build' }, { status: 503 });
    }

    const applications = await prisma.jobApplication.findMany({
      include: {
        job: {
          select: { title: true, department: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}