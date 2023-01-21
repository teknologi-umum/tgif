import { z } from "zod";

export type Metadata = {
	title: string;
	tags: string[];
	short_summary: string;
	date: Date;
};

export const metadataSchema = z.object({
	title: z.string().min(1),
	tags: z.array(z.string()),
	short_summary: z.string().min(1),
	date: z.date({ coerce: true }),
});
