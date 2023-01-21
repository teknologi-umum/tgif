import "./ChatCard.scss";

export type Chat = {
	name: string;
	summary: string;
	tags: string[];
};

type ChatCardProps = Chat;

export function ChatCard(props: ChatCardProps) {
	return (
		<div class="chat-card">
			<div class="hook">
				<div class="hook-hole"></div>
			</div>
			<div class="profile-image">
				<img
					alt={props.name}
					src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${props.name}&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=80`}
				/>
			</div>
			<span class="name">{props.name}</span>
			<p class="topic">{props.summary}</p>
		</div>
	);
}
