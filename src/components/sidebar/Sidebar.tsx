import { createSignal, For, type JSX } from "solid-js";
import autoAnimate from "@formkit/auto-animate";
import { debounce } from "@solid-primitives/scheduled";
import type { Metadata } from "~/service/Metadata";
import SearchIcon from "~icons/fluent/search-24-filled";
import { ChatCard } from "../chat-card";
import "./Sidebar.scss";

type SidebarProps = {
	talks: Metadata[];
	onChatClick: (title: string) => void;
};

export function Sidebar(props: SidebarProps) {
	const [keyword, setKeyword] = createSignal("");

	function matchWithKeyword(talk: Metadata) {
		if (keyword().length < 1) return true;
		const hasMatch = keyword()
			.split(" ")
			.filter((keyword) => keyword.length > 0)
			.some((keyword) => {
				if (keyword.startsWith("#")) {
					const tagRE = new RegExp(keyword.slice(1), "i");
					return talk.tags.some((tag) => tag.match(tagRE));
				}

				const keywordRE = new RegExp(keyword, "i");
				const nameMatched = talk.title.match(keywordRE);
				const summaryMatched = talk.short_summary.match(keywordRE);
				return nameMatched || summaryMatched;
			});
		return hasMatch;
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
				<div class="search-shadow" />
				<input
					class="search-input"
					type="text"
					onInput={updateKeyword}
					value={keyword()}
					placeholder="Search something... (add # for tags)"
				/>
				<div class="search-icon">
					<SearchIcon />
				</div>
			</div>
			<div class="chats-container">
				<div class="chats-content" use:animate>
					<For each={props.talks.filter(matchWithKeyword)}>
						{(chat) => <ChatCard {...chat} onClick={props.onChatClick} />}
					</For>
				</div>
			</div>
		</aside>
	);
}
