import { createEffect, createMemo, createSignal, For, onCleanup, type JSX, Switch, Match } from "solid-js";
import autoAnimate from "@formkit/auto-animate";
import { debounce } from "@solid-primitives/scheduled";
import type { Metadata } from "~/service/Metadata";
import SearchIcon from "~icons/fluent/search-24-filled";
import ArrowIcon from "~icons/fluent/arrow-left-12-regular";
import { ChatCard } from "../chat-card";
import "./Sidebar.scss";

type SidebarProps = {
	talks: Metadata[];
	pathname?: string;
};

export function Sidebar(props: SidebarProps) {
	const [keyword, setKeyword] = createSignal("");
	const [pathname, setPathname] = createSignal(
		typeof window === "undefined" ? props.pathname : window.location.pathname
	);
	const isPathEmpty = createMemo(() => pathname() === "/");

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
		autoAnimate(el, { duration: 200 });
	}

	createEffect(() => {
		const updatePathname = (navigateEvent: NavigateEvent) => {
			setPathname(new URL(navigateEvent.destination.url).pathname);
		};
		window.navigation.addEventListener("navigate", updatePathname);
		onCleanup(() => window.navigation.removeEventListener("navigate", updatePathname));
	});

	return (
		<aside class="sidebar">
			<div class="search-container">
				<div class="search-shadow" />
				<input
					class={`search-input ${isPathEmpty() ? "" : "search-input-active"}`}
					type="text"
					onInput={updateKeyword}
					value={keyword()}
					placeholder="Search something... (add # for tags)"
				/>
				<div
					class={`search-icon ${isPathEmpty() ? "" : "search-icon-active"}`}
					onClick={() => {
						if (!isPathEmpty()) {
							window.location.replace("/");
						}
					}}
				>
					<Switch>
						<Match when={!isPathEmpty()}>
							<ArrowIcon />
						</Match>
						<Match when={isPathEmpty()}>
							<SearchIcon />
						</Match>
					</Switch>
				</div>
			</div>
			<div class="chats-container">
				<div class="chats-content" use:animate>
					<For each={props.talks.filter(matchWithKeyword)}>
						{(chat) => (
							<ChatCard
								{...chat}
								isActive={isPathEmpty() ? true : `/chat/${chat.slug}` === pathname()}
								onClick={() => (document.title = chat.title)}
							/>
						)}
					</For>
				</div>
			</div>
		</aside>
	);
}
