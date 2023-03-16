export const isMobile = (): boolean => {
    const screenWidth  = window.innerWidth < window.screen.width ? window.innerWidth : window.screen.width;
    return screenWidth <= 768;
}

const isPathNameNull = ():boolean => location.pathname === '/'

const toggleHideElement = (elm: HTMLElement, isShow: boolean): void => {
    elm.style.display = isShow ? '' : 'none'
}

export const switchToMobile = ():void => {
	const chats = document.getElementsByTagName('aside')[0]
	const chatContent = document.getElementById("chat-content")
	if(chats && chatContent) {
		if(isMobile()) {
			if(!isPathNameNull()) {
				toggleHideElement(chats, false)
				toggleHideElement(chatContent, true)
			} else {
				toggleHideElement(chats, true)
				toggleHideElement(chatContent, false)
			}
		}
		else {
			toggleHideElement(chats, true)
			toggleHideElement(chatContent, true)
		}
    } 
}

switchToMobile()
window.addEventListener('resize', () => switchToMobile())
