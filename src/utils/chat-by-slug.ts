import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Parser } from "~/service/Parser";
import { getRandomColour } from "./colours";
import { markdownToHtml } from "./markdown-to-html";

const parser = new Parser();
const CHATS_PATH = import.meta.env.DEV ? "../../../chats" : "../../chats";

/**
 * Gets a parsed chat by its slug
 * @param slug The slug of the chat, use _ to return undefined
 * @returns parsed Telegram chat
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findChatBySlug(slug: string) {
	if (slug === "_") return undefined;

	const currentChat = await readFile(resolve(fileURLToPath(import.meta.url), CHATS_PATH, slug, "exported.json"), {
		encoding: "utf-8",
	});
	if (currentChat === undefined) return undefined;

	const parsedChat = parser.fromExportedChatHistory(currentChat);
	for (let i = 0; i < parsedChat.message.length; i++) {
		const currentMessage = parsedChat.message[i];
		if (currentMessage === undefined) continue;
		currentMessage.text = await markdownToHtml(currentMessage.text);
		currentMessage.from.colour = await getRandomColour(currentMessage.from.name);
	}

	return parsedChat;
}
