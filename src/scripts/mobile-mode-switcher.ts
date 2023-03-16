export const isMobile = (): boolean => {
	const screenWidth = window.innerWidth < window.screen.width ? window.innerWidth : window.screen.width;
	return screenWidth <= 768;
};

const isPathNameNull = (): boolean => location.pathname === "/";

const toggleHideElement = (elm: HTMLElement, isShow: boolean): void => {
	elm.style.display = isShow ? "" : "none";
};

export const switchToMobile = (): void => {
	const chats = document.getElementsByTagName("aside")[0];
	const chatContent = document.getElementById("chat-content");
	const backBtnElm = document.getElementById("backBtnElm");
	if (chats && chatContent) {
		if (isMobile()) {
			if (!isPathNameNull()) {
				toggleHideElement(chats, false);
				toggleHideElement(chatContent, true);
				createBackBtnElement();
			} else {
				toggleHideElement(chats, true);
				toggleHideElement(chatContent, false);
				backBtnElm?.remove();
			}
		} else {
			toggleHideElement(chats, true);
			toggleHideElement(chatContent, true);
		}
	}
};

const createBackBtnElement = () => {
	const btnElm = document.createElement("button");
	const containerElm = document.getElementsByClassName("container");
	btnElm.id = "backBtnElm";
	btnElm.innerHTML = "Home";
	btnElm.style.position = "fixed";
	btnElm.style.bottom = "20px";
	btnElm.style.right = "30px";
	btnElm.style.zIndex = "99";
	btnElm.style.fontSize = "18px";
	btnElm.style.border = "none";
	btnElm.style.outline = "none";
	btnElm.style.backgroundColor = "#6be4dc";
	btnElm.style.fontWeight = "bold";
	btnElm.style.cursor = "pointer";
	btnElm.style.padding = "15px";
	btnElm.style.borderRadius = "4px";

	btnElm.addEventListener("click", () => {
		location.href = "/";
	});

	if (containerElm !== null) {
		containerElm[0]?.appendChild(btnElm);
	}
};

switchToMobile();
window.addEventListener("resize", () => switchToMobile());
