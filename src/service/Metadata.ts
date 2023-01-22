import { z } from "zod";

export const metadataSchema = z.object({
	id: z.number(),
	title: z.string().min(1),
	tags: z.array(z.string()),
	short_summary: z.string().min(1),
	date: z.date({ coerce: true }),
});

export type Metadata = z.infer<typeof metadataSchema>;
