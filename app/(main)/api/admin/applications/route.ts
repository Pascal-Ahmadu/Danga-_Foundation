import { NextResponse, NextRequest } from 'next/server';

let prisma: any = null;

const getPrisma = async () => {
  if (!prisma) {
    const { default: prismaClient } = await import('@/lib/prisma');
    prisma = prismaClient;
  }
  return prisma;
};

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const prismaClient = await getPrisma();
    
    const applications = await prismaClient.jobApplication.findMany({
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