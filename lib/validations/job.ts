import { z } from 'zod'
export const createJobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'VOLUNTEER', 'INTERNSHIP']),
  description: z.string().min(1, 'Description is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  salary: z.string().optional(),
  deadline: z.string().transform((str) => new Date(str)),
})

export const updateJobSchema = createJobSchema.partial().extend({
  id: z.string().cuid(),
})