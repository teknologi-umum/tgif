import type { Metadata } from "~/service/Metadata";
import "./ChatCard.scss";

type ChatCardProps = Metadata & {
	onClick: (title: string) => void;
};

export function ChatCard(props: ChatCardProps) {
	const avatarSeed = props.title.replaceAll(" ", "").slice(0, 8);
	return (
		<div class="chat-card" onClick={() => props.onClick(props.title)}>
			<div class="hook">
				<div class="hook-hole"></div>
			</div>
			<div class="profile-image">
				<img
					alt={props.title}
					src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${avatarSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=80`}
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
	);
}