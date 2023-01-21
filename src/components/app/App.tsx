import { createMemo, createSignal } from "solid-js";
import type { Metadata } from "~/service/Metadata";
import { ChatBox } from "../chat-box";
import { Sidebar } from "../sidebar";
import "./App.scss";

type AppProps = {
	talks: Metadata[];
};

export function App(props: AppProps) {
	const [selectedTitle, setSelectedTitle] = createSignal("");
	const selectedChat = props.talks.find((talk) => talk.title === selectedTitle());

	return (
		<div class="container">
			<Sidebar talks={props.talks} onChatClick={(title) => setSelectedTitle(title)} />
			<div class="main-content">
				<ChatBox />
			</div>
		</div>
	);
}
