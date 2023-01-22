import { readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CHATS_PATH = import.meta.env.DEV ? "../../../chats" : "../../chats";

export async function getPaths() {
	const files = await readdir(resolve(fileURLToPath(import.meta.url), CHATS_PATH), {
		withFileTypes: true,
	});
	const paths = files.map((file) => file.name).map((fname) => ({ params: { slug: fname } }));
	return [{ params: { slug: "_" } }, ...paths];
}
