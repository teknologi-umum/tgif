import { unified } from "unified";
import fromMarkdown from "remark-parse";
import toHast from "remark-rehype";
import withHtmlInMarkdown from "rehype-raw";
import withShiki from "@stefanprobst/remark-shiki";
import remarkGfm from "remark-gfm";
import toHtml from 'rehype-stringify'
import * as shiki from "shiki";
import { Parser } from "~/service/Parser";

const parser = new Parser();

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

async function markdownToHtml(content: string) {
	const processor = await createProcessor();
	const vFile = await processor.process(content);
	return vFile.toString();
}

type FindChatByIdOptions = {
	transform: boolean;
};

/**
 * Gets a parsed chat by its id
 * @param id The id of the chat
 * @param chats List of chats from Astro.glob
 * @returns parsed Telegram chat
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findChatById(id: string, chats: Record<string, any>[], opts?: FindChatByIdOptions) {
	const currentChat = chats.find((chat) => chat.id === parseInt(id));
	if (currentChat === undefined) {
		// TODO(elianiva): handle properly
		console.error("CHAT NOT FOUND");
		return;
	}

	const parsedChat = parser.fromExportedChatHistory(currentChat.default);
	if (opts?.transform) {
		parsedChat.message = await Promise.all(
			parsedChat.message.map(async (msg) => ({ ...msg, text: await markdownToHtml(msg.text) }))
		);
	}

	return parsedChat;
}
