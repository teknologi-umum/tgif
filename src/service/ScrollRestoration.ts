export class ScrollRestoration {
	private element: HTMLElement;
	private storageKey: string;
	private storageAdapter: "local" | "session";

	constructor(element: HTMLElement | null, storageKey: string, storageAdapter: "local" | "session" = "session") {
		this.element = element as HTMLElement;

		if (this.element === null) {
			throw new Error(`element cannot be found`);
		}

		this.storageKey = storageKey;
		this.storageAdapter = storageAdapter;
	}

	private getScrollValue() {
		let value;

		if (this.storageAdapter === "local") {
			value = window.localStorage.getItem(this.storageKey);
		} else if (this.storageAdapter === "session") {
			value = window.sessionStorage.getItem(this.storageKey);
		}

		return Number(value);
	}

	init() {
		// remove the animation before set the scroll value to element
		const cssObj = window.getComputedStyle(this.element, null);

		const scrollBehavior = cssObj.getPropertyValue("scroll-behavior");

		this.element.style.scrollBehavior = "auto";

		this.element.scrollTop = this.getScrollValue();

		this.element.style.scrollBehavior = scrollBehavior;

		window.addEventListener("beforeunload", () => {
			const scrollValue = this.element.scrollTop;

			if (this.storageAdapter === "local") {
				window.localStorage.setItem(this.storageKey, scrollValue.toString());
			} else if (this.storageAdapter === "session") {
				window.sessionStorage.setItem(this.storageKey, scrollValue.toString());
			}
		});
	}
}
