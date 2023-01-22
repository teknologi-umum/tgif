import { createHash } from "node:crypto";

async function rng(seed: string, limit: number): Promise<number> {
	// Hash the seed
	const hashedSeed = createHash("sha256").update(seed).digest();
	// Convert the hashed seed to a big-endian integer
	const randomNumber = hashedSeed.readBigUInt64BE();
	return Number(randomNumber) % limit;
}

export async function getRandomColour(seed: string) {
	const USER_COLOURS = Array(10)
		.fill(0)
		.map(() => ["#bf3f98", "#3d60ac", "#1e948c", "#c7732e"])
		.flat();
	const random = await rng(seed, USER_COLOURS.length - 1);
	return USER_COLOURS[random] ?? "#3d60ac";
}
