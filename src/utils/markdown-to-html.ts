import { Processor, unified } from "unified";
import fromMarkdown from "remark-parse";
import toHast from "remark-rehype";
import withHtmlInMarkdown from "rehype-raw";
import withShiki from "@stefanprobst/remark-shiki";
import remarkGfm from "remark-gfm";
import toHtml from "rehype-stringify";
import * as shiki from "shiki";

let highlighter: shiki.Highlighter;
async function createProcessor() {
	if (highlighter === undefined) {
		highlighter = await shiki.getHighlighter({ theme: "github-light" });
	}
	const markdownParser = unified()
		.use(fromMarkdown)
		.use(withShiki, { highlighter })
		.use(remarkGfm)
		.use(toHast, { allowDangerousHtml: true })
		.use(withHtmlInMarkdown)
		.use(toHtml);
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
