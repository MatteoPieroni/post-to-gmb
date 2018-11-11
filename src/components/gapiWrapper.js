function getWindowGapi() {
	return window.gapi;
}

export const gapiWrapper = {
	init: getWindowGapi,
}