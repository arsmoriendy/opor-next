import { z } from "zod"

export const rawServiceSchema = z.object({
  portNumber: z.string().optional(),
  serviceName: z.string().optional(),
  transportProtocol: z.string().optional(),
  description: z.string().optional(),
  assignee: z.string().optional(),
  contact: z.string().optional(),
  registrationDate: z.string().optional(),
  modificationDate: z.string().optional(),
  reference: z.string().optional(),
  serviceCode: z.string().optional(),
  unauthorizedUseReported: z.string().optional(),
  assignmentNotes: z.string().optional(),
})

export const rawServiceListSchema = z.array(rawServiceSchema)

export const parsedServiceSchema = rawServiceSchema.extend({
  portNumberRange: z.tuple([z.number(), z.number()]).optional(),
})

export const parsedServiceListSchema = z.array(parsedServiceSchema)

export type RawService = z.infer<typeof rawServiceSchema>
export type RawServiceList = z.infer<typeof rawServiceListSchema>
export type ParsedService = z.infer<typeof parsedServiceSchema>
export type ParsedServiceList = z.infer<typeof parsedServiceListSchema>
