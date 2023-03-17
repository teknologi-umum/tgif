import { ScrollRestoration } from "~/service/ScrollRestoration";
import { storageKeys } from "~/utils/constants";

const chatContent = document.querySelector(".chat-box-content") as HTMLElement;

const chatContentScrollRestoration = new ScrollRestoration(chatContent, storageKeys.chatBoxScrollY);

chatContentScrollRestoration.init();
