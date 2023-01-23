import type { TelegramChat } from "~/service/Parser";
import { ChatBubble } from "../chat-bubble";
import "./ChatBox.scss";

type ChatBoxProps = {
	chat?: TelegramChat | undefined;
	slug: string;
};

export function ChatBox(props: ChatBoxProps) {
	if (props.chat === undefined) {
		return (
			<div class="placeholder-box">
				<h1 class="placeholder-title">Halo!</h1>
				<p class="placeholder-content">
					Situs ini berisi kumpulan wejangan dan ilmu yang dikumpulkan secara kolektif dari berbagai grup
					Telegram pemrograman Indonesia.
				</p>
				<p class="placeholder-content">
					Kamu bisa mulai membaca dengan pilih salah satu topik di sebelah kiri.
				</p>
				<p class="placeholder-content">
					Ingin kontribusi wejangan dan ilmu? Kunjungi{" "}
					<a class="url" href="https://github.com/teknologi-umu/tgif">
						teknologi-umum/tgif
					</a>
				</p>
			</div>
		);
	}

	return (
		<div class="chat-box">
			<div class="chat-box-title">{props.chat.chatName}</div>
			<div class="chat-box-container">
				<div class="chat-box-content">
					{props.chat.message.map((chat, i) => {
						const previousChat = i === 0 ? undefined : props.chat?.message[i - 1];
						const showSender = chat.from.id !== previousChat?.from.id;
						return <ChatBubble {...chat} showSender={showSender} isTop={i === 0} slug={props.slug} />;
					})}
				</div>
			</div>
		</div>
	);
}
