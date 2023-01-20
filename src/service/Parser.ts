import { z } from "zod";

export type TelegramUser = {
	name: string;
	id: number;
};

export type TelegramMessage = {
	messageId: number;
	date: Date;
	from: TelegramUser;
	replyToMessageId: number | undefined;
	photo: string | undefined;
	text: string;
};

export type TelegramChat = {
	chatName: string;
	chatId: number;
	message: TelegramMessage[];
};

const exportedChatHistorySchema = z.object({
	name: z.string(),
	type: z.string(),
	id: z.number(),
	messages: z.array(
		z.object({
			id: z.number(),
			type: z.string(),
			date: z.date({ coerce: true }),
			date_unixtime: z.string(),
			from: z.string(),
			from_id: z.string(),
			reply_to_message_id: z.number().optional(),
			photo: z.string().optional(),
			text_entities: z.array(
				z.object({
					type: z.enum(["plain", "mention", "pre", "code"]),
					text: z.string(),
				})
			),
		})
	),
});

export class Parser {
	fromText(chatName: string, chatId: number, text: string): TelegramChat {
		const telegramChat: TelegramChat = {
			chatName,
			chatId,
			message: [],
		};

		const textByNewline = text.split(/\r\n|\n/);

		let lastMessage: TelegramMessage = {
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
			date: new Date(0),
			from: {
				name: "",
				id: 0,
			},
			text: "",
		};

		for (const line of textByNewline) {
			const match = line.match(/\[\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}\]$/);
			if (match !== null) {
				// This marks as end of line.
				if (lastMessage.text !== "") {
					telegramChat.message.push(lastMessage);
				}

				lastMessage = {
					text: "",
					from: {
						name: line
							.replace(/ \[\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}\]$/, "")
							.replace(",", "")
							.trim(),
						id: 0,
					},
					date: new Date(0),
					photo: undefined,
					replyToMessageId: undefined,
					messageId: 0,
				};
				continue;
			}

			lastMessage.text += line;
		}

		// Handle last line
		if (lastMessage.text !== "") {
			telegramChat.message.push(lastMessage);
		}

		return telegramChat;
	}

	fromExportedChatHistory(rawInput: string): TelegramChat {
		const exportedChatHistory = exportedChatHistorySchema.parse(JSON.parse(rawInput));

		const telegramChat: TelegramChat = {
			chatName: exportedChatHistory.name,
			chatId: exportedChatHistory.id,
			message: [],
		};

		for (const message of exportedChatHistory.messages) {
			let text = "";

			for (const entity of message.text_entities) {
				switch (entity.type) {
					case "plain":
					case "mention":
						text += entity.text;
						break;
					case "code":
						text += "`";
						text += entity.text;
						text += "`";
						break;
					case "pre":
						text += "```\n";
						text += entity.text;
						text += "```\n";
						break;
					default:
						text += entity.text;
				}
			}

			telegramChat.message.push({
				date: new Date(message.date),
				from: {
					name: message.from,
					id: Number.parseInt(message.from_id.replace("user", "")),
				},
				messageId: message.id,
				photo: message.photo,
				replyToMessageId: message.reply_to_message_id,
				text: text,
			});
		}

		return telegramChat;
	}
}
