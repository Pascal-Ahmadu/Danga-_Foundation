import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPostSchema } from '@/lib/validations/blog'
import { generateSlug, calculateReadTime } from '@/lib/utils/slug'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createPostSchema.parse(body)

    const slug = generateSlug(validatedData.title)
    const readTime = calculateReadTime(validatedData.content)

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    })

    const finalSlug = existingPost ? `${slug}-${Date.now()}` : slug

    const post = await prisma.blogPost.create({
      data: {
        ...validatedData,
        slug: finalSlug,
        readTime,
        authorId: 'temp-admin-id', // Replace with actual user ID from auth
        excerpt: validatedData.excerpt || validatedData.content.slice(0, 150) + '...'
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}