const popupEdit = document.querySelector(".popup_type_edit")
const popupAddCard = document.querySelector(".popup_type_new-card")
const popups = document.querySelectorAll(".popup")

const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button")

const closeButtons = document.querySelectorAll(".popup__close")

function openPopup(popup) {
	popup.classList.add("popup_is-opened")
	document.addEventListener("keydown", handleEscClose)
}

function closePopup(popup) {
	popup.classList.remove("popup_is-opened")
	document.removeEventListener("keydown", handleEscClose)
}

// ESC close
function handleEscClose(evt) {
	if (evt.key === "Escape") {
		const openedPopup = document.querySelector(".popup_is-opened")
		if (openedPopup) closePopup(openedPopup)
	}
}

// overlay close
function handleOverlayClose(evt) {
	if (evt.target.classList.contains("popup")) {
		closePopup(evt.target)
	}
}

popups.forEach(popup => {
	popup.addEventListener("mousedown", handleOverlayClose)
})

addButton.addEventListener("click", () => openPopup(popupAddCard))
editButton.addEventListener("click", () => openPopup(popupEdit))

closeButtons.forEach(closeButton => {
	closeButton.addEventListener("click", () => closePopup(closeButton.closest(".popup")))
})

// image popup
const popupImage = document.querySelector(".popup_type_image")
const popupImageImg = popupImage.querySelector(".popup__image")
const popupImageCaption = popupImage.querySelector(".popup__caption")

export function openImagePopup(name, link) {
	popupImageImg.src = link
	popupImageImg.alt = name
	popupImageCaption.textContent = name
	openPopup(popupImage)
}
