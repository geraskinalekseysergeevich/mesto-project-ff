export function openPopup(popup) {
	popup.classList.add("popup_is-opened")
	document.addEventListener("keydown", handleEscClose)
}

export function closePopup(popup) {
	popup.classList.remove("popup_is-opened")
	document.removeEventListener("keydown", handleEscClose)
}

export function handleEscClose(evt) {
	if (evt.key === "Escape") {
		const openedPopup = document.querySelector(".popup_is-opened")
		if (openedPopup) closePopup(openedPopup)
	}
}

export function handleOverlayClose(evt) {
	if (evt.target.classList.contains("popup")) {
		closePopup(evt.target)
	}
}

export function openImagePopup(popup, imageElement, captionElement, name, link) {
	imageElement.src = link
	imageElement.alt = name
	captionElement.textContent = name
	openPopup(popup)
}
