import type { TelegramMessage } from "~/service/Parser";
import "./ChatBubble.scss";

type ChatBubbleProps = TelegramMessage;

export function ChatBubble(props: ChatBubbleProps) {
	return (
		<div class="chat-bubble">
			<span class="chat-sender" style={{ color: props.from.colour ?? "black" }}>
				{props.from.name}
			</span>
			<p class="chat-content" innerHTML={props.text}></p>
		</div>
	);
}
