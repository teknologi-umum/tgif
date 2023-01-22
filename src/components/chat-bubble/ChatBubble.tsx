import type { TelegramMessage } from "~/service/Parser";
import "./ChatBubble.scss";

type ChatBubbleProps = TelegramMessage;

export function ChatBubble(props: ChatBubbleProps) {
	return (
		<div class="chat-bubble">
			<span class="chat-sender" style={{ color: props.from.colour ?? "black" }}>
				{props.from.name}
			</span>
			{props.repliedTo !== undefined && (
				<div class="chat-reply-box">
					<span class="chat-reply-sender" style={{ color: props.repliedTo.from.colour ?? "black" }}>
						{props.repliedTo.from.name}
					</span>
					<div class="chat-reply-content" innerHTML={props.repliedTo.text} />
				</div>
			)}
			<div class="chat-content" innerHTML={props.text} />
		</div>
	);
}
