import { createSignal, For, type JSX } from "solid-js";
import autoAnimate from "@formkit/auto-animate";
import SearchIcon from "~icons/fluent/search-24-filled";
import { type Chat, ChatCard } from "../chat-card";
import "./Sidebar.scss";
import { debounce } from "@solid-primitives/scheduled";

type SidebarProps = {
	chats: Chat[];
};

export function Sidebar(props: SidebarProps) {
	const [keyword, setKeyword] = createSignal("");

	function filterPredicate(chat: Chat) {
		const keywordRE = new RegExp(keyword(), "i");
		const nameMatched = chat.name.match(keywordRE);
		const summaryMatched = chat.summary.match(keywordRE);
		return nameMatched || summaryMatched;
	}

	const updateKeyword: JSX.EventHandler<HTMLInputElement, InputEvent> = debounce(
		(e) => setKeyword((e.target as HTMLInputElement).value),
		250
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function animate(el: HTMLDivElement) {
		autoAnimate(el, {
			duration: 150,
		});
	}

	return (
		<aside class="sidebar">
			<div class="search-container">
				<input
					class="search-input"
					type="text"
					onInput={updateKeyword}
					value={keyword()}
					placeholder="Search something..."
				/>
				<div class="search-icon">
					<SearchIcon />
				</div>
			</div>
			<div class="chats-container">
				<div class="chats-content" use:animate>
					<For each={props.chats.filter(filterPredicate)}>{(chat) => <ChatCard {...chat} />}</For>
				</div>
			</div>
		</aside>
	);
}
