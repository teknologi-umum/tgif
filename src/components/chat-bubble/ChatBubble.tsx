import { Match, Show, Switch } from "solid-js";
import type { TelegramMessage } from "~/service/Parser";
import "./ChatBubble.scss";

type ChatBubbleProps = TelegramMessage & {
	showSender: boolean;
	isTop?: boolean;
	slug: string;
};

export function ChatBubble(props: ChatBubbleProps) {
	const shouldHavePadding = props.hasMedia && props.repliedTo === undefined;

	function resolveMediaClassname() {
		if (!props.hasMedia) return "";
		if (props.mediaType === "sticker") return "chat-sticker";
		if (props.mediaType === "photo") return "chat-photo";
		return "chat-media";
	}

	return (
		<div
			class="chat-bubble"
			style={{
				"margin-top": !props.isTop && props.showSender ? "4rem" : "2rem",
				padding: shouldHavePadding ? "0" : "2.5rem 2rem 1.5rem 2rem",
				"padding-top": shouldHavePadding ? "0" : props.showSender ? "3rem" : "1rem",
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
			<Switch>
				<Match when={props.hasMedia}>
					<img
						class={resolveMediaClassname()}
						src={props.hasMedia ? `/chats/${props.slug}/${props.file}` : ""}
					/>
				</Match>
				<Match when={!props.hasMedia}>
					<div class="chat-content" innerHTML={props.text} />
				</Match>
			</Switch>
		</div>
	);
}
