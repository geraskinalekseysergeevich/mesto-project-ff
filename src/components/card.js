import { initialCards } from "./cards"
import { openImagePopup } from "./modal"

const placesList = document.querySelector(".places__list")
const cardTemplate = document.querySelector("#card-template").content

export function createCard(name, link) {
	const card = cardTemplate.querySelector(".card").cloneNode(true)

	const image = card.querySelector(".card__image")
	const title = card.querySelector(".card__title")
	const deleteButton = card.querySelector(".card__delete-button")

	image.src = link
	image.alt = name
	title.textContent = name

	deleteButton.addEventListener("click", () => {
		card.remove()
	})

	image.addEventListener("click", () => {
		openImagePopup(name, link)
	})

	return card
}

initialCards.forEach(({ name, link }) => {
	const cardElement = createCard(name, link)
	placesList.append(cardElement)
})
