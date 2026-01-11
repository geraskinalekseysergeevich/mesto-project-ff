import "../pages/index.css"
import { createCard } from "./card"
import { initialCards } from "./cards"
import { handleOverlayClose, openPopup, closePopup } from "./modal"
import { clearValidation, enableValidation } from "./validation"

// cards init
const placesList = document.querySelector(".places__list")
const cardTemplate = document.querySelector("#card-template").content

function openImagePopup(name, link) {
	popupImageImg.src = link
	popupImageImg.alt = name
	popupImageCaption.textContent = name
	openPopup(popupImage)
}

initialCards.forEach(({ name, link }) => {
	const cardElement = createCard(cardTemplate, name, link, openImagePopup)
	placesList.append(cardElement)
})

// DOM
const popups = document.querySelectorAll(".popup")
const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button")
const closeButtons = document.querySelectorAll(".popup__close")
const profileName = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")

// popups
const popupEdit = document.querySelector(".popup_type_edit")
const popupAddCard = document.querySelector(".popup_type_new-card")
const popupImage = document.querySelector(".popup_type_image")
const popupImageImg = popupImage.querySelector(".popup__image")
const popupImageCaption = popupImage.querySelector(".popup__caption")

// forms
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]')
const addCardForm = document.querySelector('.popup__form[name="new-place"]')

// forms validation
const validationConfig = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	validationRegex: /^[a-zA-Zа-яА-ЯёЁ\- ]+$/,
	errorMessage: "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
}
enableValidation(validationConfig)

// popups close
popups.forEach(popup => {
	popup.addEventListener("mousedown", handleOverlayClose)
})

closeButtons.forEach(closeButton => {
	closeButton.addEventListener("click", () => closePopup(closeButton.closest(".popup")))
})

// profile edit
editButton.addEventListener("click", () => {
	editProfileForm.name.value = profileName.textContent
	editProfileForm.description.value = profileDescription.textContent
	clearValidation(editProfileForm, validationConfig)
	openPopup(popupEdit)
})
editProfileForm.addEventListener("submit", evt => {
	evt.preventDefault()
	profileName.textContent = editProfileForm.name.value
	profileDescription.textContent = editProfileForm.description.value
	closePopup(popupEdit)
})

// add card
addButton.addEventListener("click", () => {
	clearValidation(addCardForm, validationConfig)
	openPopup(popupAddCard)
})

addCardForm.addEventListener("submit", evt => {
	evt.preventDefault()
	const name = addCardForm["place-name"].value
	const link = addCardForm.link.value
	const newCard = createCard(cardTemplate, name, link, openImagePopup)
	placesList.prepend(newCard)
	closePopup(popupAddCard)
	addCardForm.reset()
})
