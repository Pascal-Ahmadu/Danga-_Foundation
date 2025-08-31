import { NextResponse, NextRequest } from 'next/server';

// Lazy import prisma to avoid build-time initialization
let prisma: any = null;

const getPrisma = async () => {
  if (!prisma) {
    const { default: prismaClient } = await import('@/lib/prisma');
    prisma = prismaClient;
  }
  return prisma;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip during build or if no database URL
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { status } = body;

    const prismaClient = await getPrisma();
    
    const application = await prismaClient.jobApplication.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// Add a GET method if you need one
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const prismaClient = await getPrisma();
    
    const application = await prismaClient.jobApplication.findUnique({
      where: { id: params.id },
      include: {
        job: {
          select: { title: true, department: true }
        }
      }
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}