import { Parser } from "~/service/Parser";

const parser = new Parser();

/**
 * Gets a parsed chat by its id
 * @param id The id of the chat
 * @param chats List of chats from Astro.glob
 * @returns parsed Telegram chat
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findChatById(id: string, chats: Record<string, any>[]) {
	const currentChat = chats.find((chat) => chat.id === parseInt(id));
	if (currentChat === undefined) {
		console.error("CHAT NOT FOUND");
		return;
	}
	const parsedChat = parser.fromExportedChatHistory(currentChat.default);
	return parsedChat;
}
