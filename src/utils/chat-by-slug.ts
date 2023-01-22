import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Parser } from "~/service/Parser";
import { getRandomColour } from "./colours";
import { markdownToHtml } from "./markdown-to-html";

const parser = new Parser();

type FindChatByIdOptions = {
	transform: boolean;
};

/**
 * Gets a parsed chat by its id
 * @param slug The id of the chat
 * @param chats List of chats from Astro.glob
 * @returns parsed Telegram chat
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findChatBySlug(slug: string, opts?: FindChatByIdOptions) {
	const currentChat = await readFile(
		resolve(fileURLToPath(import.meta.url), "../../chats", slug, "exported.json"),
		{ encoding: "utf-8" }
	);

	if (currentChat === undefined) {
		return undefined;
	}

	const parsedChat = parser.fromExportedChatHistory(currentChat);
	if (opts?.transform) {
		for (let i = 0; i < parsedChat.message.length; i++) {
			const currentMessage = parsedChat.message[i];
			if (currentMessage === undefined) continue;
			currentMessage.text = await markdownToHtml(currentMessage.text);
			currentMessage.from.colour = await getRandomColour(currentMessage.from.name);
		}
	}

	return parsedChat;
}
