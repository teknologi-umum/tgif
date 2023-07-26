import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Metadata, metadataSchema } from "~/service/Metadata";
import { Parser, TelegramChat } from "~/service/Parser";
import { getRandomColour } from "./colours";
import { markdownToHtml } from "./markdown-to-html";
import { resolveChatAssetsPath } from "./resolve-chat-assets-path";

const parser = new Parser();
const CHATS_PATH = resolveChatAssetsPath();

type FindChatResult = {
	chat: TelegramChat;
	metadata: Metadata;
};

/**
 * Gets a parsed chat by its slug
 * @param slug The slug of the chat, use _ to return undefined
 * @returns parsed Telegram chat
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findChatBySlug(slug: string): Promise<FindChatResult | undefined> {
	if (slug === "_") return undefined;

	const chat = await readFile(resolve(fileURLToPath(import.meta.url), CHATS_PATH, slug, "exported.json"), {
		encoding: "utf-8",
	});
	const metadata = await readFile(resolve(fileURLToPath(import.meta.url), CHATS_PATH, slug, "metadata.json"), {
		encoding: "utf-8",
	});
	if (chat === undefined) return undefined;

	const parsedChat = parser.fromExportedChatHistory(chat);
	for (let i = 0; i < parsedChat.message.length; i++) {
		const currentMessage = parsedChat.message[i];
		if (currentMessage === undefined) continue;
		currentMessage.text = await markdownToHtml(currentMessage.text.replaceAll("\n\n", "  \n"));
		currentMessage.from.colour = await getRandomColour(currentMessage.from.name);
	}

	for (let i = 0; i < parsedChat.message.length; i++) {
		const currentMessage = parsedChat.message[i];
		if (currentMessage === undefined || currentMessage.replyToMessageId === null) continue;

		const repliedMessage = parsedChat.message.find((msg) => msg.messageId === currentMessage.replyToMessageId);
		if (repliedMessage === undefined) continue;

		currentMessage.repliedTo = repliedMessage;
	}

	return {
		chat: parsedChat,
		metadata: metadataSchema.parse(JSON.parse(metadata)),
	};
}
