import type { TelegramMessage } from "~/service/Parser";
import "./ChatBubble.scss";

type ChatBubbleProps = TelegramMessage;

export function ChatBubble(props: ChatBubbleProps) {
	return (
		<div class="chat-bubble">
			<p>{props.text}</p>
		</div>
	);
}
