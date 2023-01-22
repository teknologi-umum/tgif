import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import type { TelegramMessage } from "~/service/Parser";
import "./ChatBubble.scss";
import { ChatSender } from "./ChatSender";

const parser = remark().use(remarkGfm).use(remarkHtml);

export function markdownToHtml(content: string) {
	return parser.processSync(content).toString();
}

type ChatBubbleProps = TelegramMessage;

export function ChatBubble(props: ChatBubbleProps) {
	return (
		<div class="chat-bubble">
			<ChatSender name={props.from.name} />
			<p class="chat-content" innerHTML={markdownToHtml(props.text)}></p>
		</div>
	);
}
