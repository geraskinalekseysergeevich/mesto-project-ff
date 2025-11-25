const popupEdit = document.querySelector(".popup_type_edit")
const popupAddCard = document.querySelector(".popup_type_new-card")
const popups = document.querySelectorAll(".popup")

const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button")
const closeButtons = document.querySelectorAll(".popup__close")

const profileName = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")

const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]')
const profileNameInput = editProfileForm.querySelector(".popup__input_type_name")
const profileJobInput = editProfileForm.querySelector(".popup__input_type_description")

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
editButton.addEventListener("click", () => {
	profileNameInput.value = profileName.textContent
	profileJobInput.value = profileDescription.textContent
	openPopup(popupEdit)
})

closeButtons.forEach(closeButton => {
	closeButton.addEventListener("click", () => closePopup(closeButton.closest(".popup")))
})

function handleFormSubmit(evt) {
	evt.preventDefault()

	const newName = profileNameInput.value
	const newJob = profileJobInput.value

	profileName.textContent = newName
	profileDescription.textContent = newJob

	closePopup(popupEdit)
}

editProfileForm.addEventListener("submit", handleFormSubmit)

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
