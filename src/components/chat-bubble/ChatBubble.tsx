import { Show } from "solid-js";
import type { TelegramMessage } from "~/service/Parser";
import "./ChatBubble.scss";

type ChatBubbleProps = TelegramMessage & {
	showSender: boolean;
	isTop?: boolean;
};

export function ChatBubble(props: ChatBubbleProps) {
	return (
		<div
			class="chat-bubble"
			style={{
				"margin-top": !props.isTop && props.showSender ? "4rem" : "2rem",
				"padding-top": props.showSender ? "3rem" : "1rem",
			}}
		>
			<Show when={props.showSender}>
				<span class="chat-sender" style={{ color: props.from.colour ?? "black" }}>
					{props.from.name}
				</span>
			</Show>
			<Show when={props.repliedTo !== undefined}>
				<div class="chat-reply-box">
					<span class="chat-reply-sender" style={{ color: props.repliedTo?.from.colour ?? "black" }}>
						{props.repliedTo?.from.name}
					</span>
					<div class="chat-reply-content" innerHTML={props.repliedTo?.text ?? ""} />
				</div>
			</Show>
			<div class="chat-content" innerHTML={props.text} />
		</div>
	);
}
