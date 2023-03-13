export const isMobile = (): boolean => {
    const screenWidth  = window.innerWidth < window.screen.width ? window.innerWidth : window.screen.width;
    return screenWidth <= 768;
}

// delete element #chat-content if mobile mode
const switchToMobile = () => {
	isMobile()
		? document.querySelector('#chat-content')?.remove()
		: false;
}

window.addEventListener('resize', switchToMobile)

switchToMobile()