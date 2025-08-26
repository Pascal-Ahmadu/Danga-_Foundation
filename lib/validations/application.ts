import { z } from 'zod'

export const updateApplicationSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(['PENDING', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEWED', 'ACCEPTED', 'REJECTED']),
})