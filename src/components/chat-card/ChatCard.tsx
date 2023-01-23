import type { Metadata } from "~/service/Metadata";
import "./ChatCard.scss";

type ChatCardProps = Metadata & {
	isActive: boolean;
	onClick?: () => void;
};

export function ChatCard(props: ChatCardProps) {
	return (
		<a href={`/chat/${props.slug}`} style={{ "text-decoration": "none" }} onClick={() => props.onClick?.()}>
			<div class={["chat-card", props.isActive ? "" : "chat-card-inactive"].join(" ")}>
				<div class="hook">
					<div class="hook-hole"></div>
				</div>
				<div class="profile-image">
					<img
						alt={props.title}
						src={`https://source.boringavatars.com/beam/120/${encodeURIComponent(
							props.title
						)}?colors=fca2e1,93b5ff,6be4dc,f9e3a9,4a6cb6`}
					/>
				</div>
				<span class="name">{props.title}</span>
				<p class="summary">{props.short_summary}</p>
				<div class="tags">
					{props.tags.map((tag) => (
						<div class="tags-item">{tag}</div>
					))}
				</div>
			</div>
		</a>
	);
}
