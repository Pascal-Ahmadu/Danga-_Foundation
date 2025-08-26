import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { generateSlug, calculateReadTime } from '@/lib/utils/slug';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...updateData,
        ...(updateData.title && { slug: generateSlug(updateData.title) }),
        ...(updateData.content && { readTime: calculateReadTime(updateData.content) })
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blogPost.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
