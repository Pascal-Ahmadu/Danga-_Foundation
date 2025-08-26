import { NextResponse, NextRequest } from 'next/server';
import { createJobSchema } from '@/lib/validations/job';
import { generateSlug } from '@/lib/utils/slug';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        applications: {
          select: { id: true, status: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createJobSchema.parse(body)

    const slug = generateSlug(validatedData.title)

    const job = await prisma.job.create({
      data: {
        ...validatedData,
        slug
      }
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
}