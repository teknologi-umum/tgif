export function resolveChatAssetsPath() {
	const CHATS_PATH = import.meta.env.DEV ? "../../../public/chats" : "../../../chats";
	return CHATS_PATH;
}
