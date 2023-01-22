import type { TelegramMessage } from "~/service/Parser";
import "./ChatBubble.scss";
import { ChatSender } from "./ChatSender";

type ChatBubbleProps = TelegramMessage;

export function ChatBubble(props: ChatBubbleProps) {
	return (
		<div class="chat-bubble">
			<ChatSender name={props.from.name} />
			<p class="chat-content" innerHTML={props.text}></p>
		</div>
	);
}
