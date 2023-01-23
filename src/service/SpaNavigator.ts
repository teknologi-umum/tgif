// ref: https://github.com/Charca/astro-music

export class SpaNavigator {
	private shouldNotIntercept(navigationEvent: NavigateEvent) {
		return (
			navigationEvent.canIntercept === false ||
			// If this is just a hashChange,
			// just let the browser handle scrolling to the content.
			navigationEvent.hashChange ||
			// If this is a download,
			// let the browser perform the download.
			navigationEvent.downloadRequest !== null ||
			// If this is a form submission,
			// let that go to the server.
			navigationEvent.formData !== null
		);
	}

	private render(data: string) {
		const wrapper = document.getElementById("chat-content");
		if (wrapper === null) return;
		wrapper.innerHTML = data;
	}

	private async getFragment(pathname: string) {
		const response = await fetch(`/fragments${pathname}`);
		const data = await response.text();
		return data;
	}

	public async handle(navigateEvent: NavigateEvent) {
		if (this.shouldNotIntercept(navigateEvent)) return;

		const toUrl = new URL(navigateEvent.destination.url);
		const toPath = toUrl.pathname;
		if (location.origin !== toUrl.origin || window.location.href === toUrl.href) return;

		navigateEvent.intercept({
			handler: async () => {
				const loadingFragment = await this.getFragment("/loading/");
				this.render(loadingFragment);
				const chatFragment = await this.getFragment((toPath === "/" ? "/chat/_" : toPath) + "/");
				this.render(chatFragment);
			},
		});
	}
}
