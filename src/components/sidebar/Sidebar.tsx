import { createSignal, For, onCleanup, onMount } from "solid-js";
import autoAnimate from "@formkit/auto-animate";
// import { debounce } from "@solid-primitives/scheduled";
import type { Metadata } from "~/service/Metadata";
// import SearchIcon from "~icons/fluent/search-24-filled";
// import ArrowIcon from "~icons/fluent/arrow-left-12-regular";
import { ChatCard } from "../chat-card";
import "./Sidebar.scss";
import { storageKeys } from "~/utils/constants";

type SidebarProps = {
	talks: Metadata[];
	pathname?: string;
};

export function Sidebar(props: SidebarProps) {
	let chatsContentEl!: HTMLDivElement;
	const [keyword] = createSignal("");
	const pathname = () => (typeof window === "undefined" ? props.pathname : window.location.pathname);
	const isPathEmpty = () => pathname() === "/";

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

	// const updateKeyword: JSX.EventHandler<HTMLInputElement, InputEvent> = debounce(
	// 	(e) => setKeyword((e.target as HTMLInputElement).value),
	// 	250
	// );

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function animate(el: HTMLDivElement) {
		autoAnimate(el, { duration: 200 });
	}

	function storeCurrentScrollPositionToSessionStorage() {
		window.sessionStorage.setItem(storageKeys.sidebarScrollY, chatsContentEl.scrollTop.toString());
	}

	onMount(() => {
		chatsContentEl.scrollTop = Number(window.sessionStorage.getItem(storageKeys.sidebarScrollY));

		window.addEventListener("beforeunload", storeCurrentScrollPositionToSessionStorage);
	});

	onCleanup(() => {
		if (typeof window === "undefined") return;
		window.removeEventListener("beforeunload", storeCurrentScrollPositionToSessionStorage);
	});

	return (
		<div ref={chatsContentEl} class="chats-content" use:animate>
			<For each={props.talks.filter(matchWithKeyword)}>
				{(chat) => (
					<ChatCard
						{...chat}
						isActive={isPathEmpty() ? true : `/chat/${chat.slug}` === pathname()}
						onClick={() => {
							document.title = `${chat.title} | TGIF`;
							window.sessionStorage.setItem(
								storageKeys.sidebarScrollY,
								chatsContentEl.scrollTop.toString()
							);
						}}
					/>
				)}
			</For>
		</div>
	);
}
