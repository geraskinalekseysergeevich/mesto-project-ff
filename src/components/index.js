import "../pages/index.css"
import { getCards, getUserProfile, patchUserProfile, postCard, patchAvatar } from "./api"
import { createCard, removeCard } from "./card"
import { handleOverlayClose, openPopup, closePopup } from "./modal"
import { renderLoading } from "./ux"
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

// DOM
const popups = document.querySelectorAll(".popup")
const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button")
const closeButtons = document.querySelectorAll(".popup__close")
const profileName = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")
const profileAvatar = document.querySelector(".profile__image")

// popups
const popupEdit = document.querySelector(".popup_type_edit")
const popupAddCard = document.querySelector(".popup_type_new-card")
const popupImage = document.querySelector(".popup_type_image")
const popupImageImg = popupImage.querySelector(".popup__image")
const popupImageCaption = popupImage.querySelector(".popup__caption")
const popupConfirmDelete = document.querySelector(".popup_type_confirm-delete")
const popupEditAvatar = document.querySelector(".popup_type_avatar")

// forms
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]')
const addCardForm = document.querySelector('.popup__form[name="new-place"]')
const confirmDeleteForm = popupConfirmDelete.querySelector(".popup__form")
const editAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]')

// catch card:delete-request event
let cardToDelete = null
placesList.addEventListener("card:delete-request", evt => {
	cardToDelete = evt.detail
	openPopup(popupConfirmDelete)
})

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
confirmDeleteForm.addEventListener("submit", evt => {
	evt.preventDefault()
	removeCard(cardToDelete)
	closePopup(popupConfirmDelete)
})

// profile edit
editButton.addEventListener("click", () => {
	editProfileForm.name.value = profileName.textContent
	editProfileForm.description.value = profileDescription.textContent
	clearValidation(editProfileForm, validationConfig)
	openPopup(popupEdit)
})
editProfileForm.addEventListener("submit", async evt => {
	evt.preventDefault()

	const submitButton = evt.submitter
	renderLoading(submitButton, true)

	try {
		const updatedData = await patchUserProfile(editProfileForm.name.value, editProfileForm.description.value)
		profileName.textContent = updatedData.name
		profileDescription.textContent = updatedData.about
		closePopup(popupEdit)
	} catch (err) {
		console.error("Ошибка при редактировании профиля:", err)
	} finally {
		renderLoading(submitButton, false)
	}
})

// add card
addButton.addEventListener("click", () => {
	clearValidation(addCardForm, validationConfig)
	openPopup(popupAddCard)
})

addCardForm.addEventListener("submit", async evt => {
	evt.preventDefault()

	const submitButton = evt.submitter
	renderLoading(submitButton, true)

	const name = addCardForm["place-name"].value
	const link = addCardForm.link.value
	try {
		const newCard = await postCard(name, link)
		const cardElement = createCard({ template: cardTemplate, userId, cardData: newCard, openImagePopup })
		placesList.prepend(cardElement)
		closePopup(popupAddCard)
		addCardForm.reset()
	} catch (err) {
		console.error("Ошибка при добавлении карточки:", err)
	} finally {
		renderLoading(submitButton, false)
	}
})

// edit profile
profileAvatar.addEventListener("click", () => {
	editAvatarForm.avatar.value = profileAvatar.dataset.avatar
	clearValidation(editAvatarForm, validationConfig)
	openPopup(popupEditAvatar)
})

editAvatarForm.addEventListener("submit", async evt => {
	evt.preventDefault()
	const avatarUrl = editAvatarForm.avatar.value

	const submitButton = evt.submitter
	renderLoading(submitButton, true)

	try {
		const updatedUser = await patchAvatar(avatarUrl)
		profileAvatar.style.backgroundImage = `url(${updatedUser.avatar})`
		closePopup(popupEditAvatar)
		editAvatarForm.reset()
	} catch (err) {
		console.error("Ошибка при обновлении аватара:", err)
	} finally {
		renderLoading(submitButton, false)
	}
})

// page init with data
let userId = null
const init = async () => {
	try {
		const [user, cards] = await Promise.all([getUserProfile(), getCards()])
		userId = user._id

		// profile init
		profileName.textContent = user.name
		profileDescription.textContent = user.about
		profileAvatar.dataset.avatar = user.avatar
		profileAvatar.style.backgroundImage = `url(${user.avatar})`

		// cards
		cards.forEach(item => {
			const cardElement = createCard({ template: cardTemplate, userId, cardData: item, openImagePopup })
			placesList.append(cardElement)
		})
	} catch (err) {
		console.error(err)
	}
}
init()
