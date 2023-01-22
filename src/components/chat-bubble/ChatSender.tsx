import { createResource } from "solid-js";

async function rng(seed: string, limit: number): Promise<number> {
	// Hash the seed
	const encoder = new TextEncoder();
	const data = encoder.encode(seed);
	const hash = await crypto.subtle.digest("SHA-256", data);
	// Convert the hashed seed to a big-endian integer
	const array = new Uint8Array(hash);
	let randomNumber = 0;
	for (let i = 0; i < array.length; i++) {
		randomNumber += (array[i] ?? 1) * Math.pow(2, 8 * i);
	}
	return randomNumber % limit;
}

type ChatSenderProps = {
	name: string;
};

export function ChatSender(props: ChatSenderProps) {
	const [userColour] = createResource(async () => {
		const USER_COLOURS = Array(10)
			.fill(0)
			.map(() => ["#bf3f98", "#3d60ac", "#1e948c", "#c7732e"])
			.flat();
		const random = await rng(props.name, USER_COLOURS.length - 1);
		return USER_COLOURS[random];
	});

	return (
		<span class="chat-sender" style={{ color: userColour() }}>
			{props.name}
		</span>
	);
}
