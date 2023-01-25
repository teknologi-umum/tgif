import { Processor, unified } from "unified";
import fromMarkdown from "remark-parse";
import toHast from "remark-rehype";
import withShiki from "@leafac/rehype-shiki";
import withGfm from "remark-gfm";
import withBreaks from "remark-breaks";
import toHtml from "rehype-stringify";
import * as shiki from "shiki";

let highlighter: shiki.Highlighter;
async function createProcessor() {
	if (highlighter === undefined) {
		highlighter = await shiki.getHighlighter({ theme: "github-light" });
	}
	const markdownParser = unified()
		.use(fromMarkdown)
		.use(withGfm)
		.use(withBreaks)
		.use(toHast, { allowDangerousHtml: true })
		.use(withShiki, { highlighter })
		.use(toHtml, { allowDangerousHtml: true });
	return markdownParser;
}

let processor: Processor;
export async function markdownToHtml(content: string) {
	if (processor === undefined) {
		processor = await createProcessor();
	}
	const vFile = await processor.process(content);
	return vFile.toString();
}
