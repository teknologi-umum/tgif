import flourite from "flourite";
import { z } from "zod";

export type TelegramUser = {
	name: string;
	id: number;
	colour?: string;
};

export type TelegramMessageBase = {
	messageId: number;
	date: Date;
	from: TelegramUser;
	replyToMessageId: number | undefined;
	repliedTo?: TelegramMessage;
	text: string;
	hasMedia: boolean;
};

export type TelegramMessageWithAnimation = {
	hasMedia: true;
	mediaType: "animation";
	mimeType: string;
	thumbnail: string;
	file: string;
	width: number;
	height: number;
} & TelegramMessageBase;

export type TelegramMessageWithPhoto = {
	hasMedia: true;
	mediaType: "photo";
	file: string;
	width: number;
	height: number;
} & TelegramMessageBase;

export type TelegramMessageWithSticker = {
	hasMedia: true;
	mediaType: "sticker";
	thumbnail: string;
	file: string;
	width: number;
	height: number;
} & TelegramMessageBase;

export type TelegramMessageWithVideoFile = {
	hasMedia: true;
	mediaType: "video_file";
	mimeType: string;
	thumbnail: string;
	file: string;
	width: number;
	height: number;
} & TelegramMessageBase;

export type TelegramMessage =
	| (TelegramMessageBase & { hasMedia: false })
	| TelegramMessageWithAnimation
	| TelegramMessageWithPhoto
	| TelegramMessageWithSticker
	| TelegramMessageWithVideoFile;

export type TelegramChat = {
	chatName: string;
	chatId: number;
	message: TelegramMessage[];
};

const messageTypes = [
	"plain",
	"mention",
	"pre",
	"code",
	"bot_command",
	"italic",
	"bold",
	"link",
	"hashtag",
	"spoiler",
	"underline",
	"text_link",
	"mention_name",
	"url",
	"email",
] as const;
type MessageType = (typeof messageTypes)[number];

const exportedChatHistorySchema = z.object({
	name: z.string(),
	type: z.string(),
	id: z.number(),
	messages: z.array(
		z.object({
			id: z.number(),
			type: z.string(),
			date: z.date({ coerce: true }),
			date_unixtime: z.string().optional(),
			from: z
				.string()
				.nullable()
				.transform((arg: string | null): string => arg ?? "Deleted Account"),
			from_id: z.string(),
			reply_to_message_id: z.number().optional(),
			file: z.string().optional(),
			thumbnail: z.string().optional(),
			media_type: z.enum(["animation", "photo", "sticker", "video_file"] as const).optional(),
			mime_type: z.string().optional(),
			width: z.number().optional(),
			height: z.number().optional(),
			photo: z.string().optional(),
			text: z.union([
				z.string(),
				z.array(
					z.union([
						z.string(),
						z.object({
							type: z.enum(messageTypes),
							text: z.string(),
							href: z.string().optional(),
						}),
					])
				),
			]),
			text_entities: z
				.array(
					z.object({
						type: z.enum(messageTypes),
						text: z.string(),
						href: z.string().optional(),
					})
				)
				.optional(),
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
			replyToMessageId: undefined,
			messageId: 0,
			date: new Date(0),
			from: {
				name: "",
				id: 0,
			},
			text: "",
			hasMedia: false,
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
					replyToMessageId: undefined,
					messageId: 0,
					hasMedia: false,
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

	private addTextFormatting(text: string, type: MessageType, href?: string) {
		let result = "";
		switch (type) {
			case "plain":
			case "mention":
				result += text;
				break;
			case "code":
				result += "`" + text + "`";
				break;
			case "pre": {
				const detected = flourite(text, { shiki: true });
				result += "```" + detected.language + "\n" + text + "\n```\n";
				break;
			}
			case "italic":
				result += "*" + text + "*";
				break;
			case "bold":
				result += "**" + text + "**";
				break;
			case "spoiler":
				result += '<span class="spoiler">' + text + "</span>";
				break;
			case "underline":
				result += "<u>" + text + "</u>";
				break;
			case "text_link":
				if (href != null) {
					result += '<a href="' + href + '">' + text + "</a>";
					break;
				} else {
					result += text;
					break;
				}
			case "url":
				result += '<a href="' + text + '">' + text + "</a>";
				break;
			case "email":
				result += '<a href="mailto:' + text + '">' + text + "</a>";
				break;
			default:
				result += text;
		}
		//console.log(type);
		return result;
	}

	fromExportedChatHistory(input: string): TelegramChat {
		const exportedChatHistory = exportedChatHistorySchema.parse(JSON.parse(input));

		const telegramChat: TelegramChat = {
			chatName: exportedChatHistory.name,
			chatId: exportedChatHistory.id,
			message: [],
		};

		for (const message of exportedChatHistory.messages) {
			let text = "";

			// message.text_entities should be prioritized
			// if they exists, because they are far easier to parse.
			if (message.text_entities !== undefined) {
				for (const entity of message.text_entities) {
					text += this.addTextFormatting(entity.text, entity.type);
				}
			} else {
				// use message.text
				if (typeof message.text === "string") {
					text += message.text;
				} else {
					for (const entity of message.text) {
						if (typeof entity === "string") {
							text += entity;
							continue;
						}

						text += this.addTextFormatting(entity.text, entity.type, entity.href);
					}
				}
			}

			if (message.photo !== undefined) {
				telegramChat.message.push({
					date: new Date(message.date),
					from: {
						name: message.from,
						id: Number.parseInt(message.from_id.replace("user", "")),
					},
					messageId: message.id,
					replyToMessageId: message.reply_to_message_id,
					text: text,
					hasMedia: true,
					mediaType: "photo",
					height: message.height ?? 0,
					width: message.width ?? 0,
					file: message.photo,
				});
				continue;
			}

			if (message.media_type === "sticker") {
				telegramChat.message.push({
					date: new Date(message.date),
					from: {
						name: message.from,
						id: Number.parseInt(message.from_id.replace("user", "")),
					},
					messageId: message.id,
					replyToMessageId: message.reply_to_message_id,
					text: text,
					hasMedia: true,
					mediaType: "sticker",
					height: message.height ?? 0,
					width: message.width ?? 0,
					file: message.file ?? "",
					thumbnail: message.thumbnail ?? "",
				});
				continue;
			} else if (message.media_type === "animation") {
				telegramChat.message.push({
					date: new Date(message.date),
					from: {
						name: message.from,
						id: Number.parseInt(message.from_id.replace("user", "")),
					},
					messageId: message.id,
					replyToMessageId: message.reply_to_message_id,
					text: text,
					hasMedia: true,
					mediaType: "animation",
					height: message.height ?? 0,
					width: message.width ?? 0,
					file: message.file ?? "",
					thumbnail: message.thumbnail ?? "",
					mimeType: message.mime_type ?? "",
				});
				continue;
			} else if (message.media_type === "video_file") {
				telegramChat.message.push({
					date: new Date(message.date),
					from: {
						name: message.from,
						id: Number.parseInt(message.from_id.replace("user", "")),
					},
					messageId: message.id,
					replyToMessageId: message.reply_to_message_id,
					text: text,
					hasMedia: true,
					mediaType: "video_file",
					height: message.height ?? 0,
					width: message.width ?? 0,
					file: message.file ?? "",
					thumbnail: message.thumbnail ?? "",
					mimeType: message.mime_type ?? "",
				});
				continue;
			} else {
				telegramChat.message.push({
					date: new Date(message.date),
					from: {
						name: message.from,
						id: Number.parseInt(message.from_id.replace("user", "")),
					},
					messageId: message.id,
					replyToMessageId: message.reply_to_message_id,
					text: text,
					hasMedia: false,
				});
			}
		}

		return telegramChat;
	}
}
