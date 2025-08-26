import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500, 'Excerpt too long').optional(),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Invalid image URL').optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
})

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().cuid(),
})