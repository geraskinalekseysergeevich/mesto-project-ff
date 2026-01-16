export function toggleLike(evt) {
	evt.target.classList.toggle("card__like-button_is-active")
}

export function removeCard(cardElement) {
	cardElement.remove()
}

export function createCard({ template, userId, cardData, openImagePopup }) {
	const card = template.querySelector(".card").cloneNode(true)

	const image = card.querySelector(".card__image")
	const title = card.querySelector(".card__title")
	const deleteButton = card.querySelector(".card__delete-button")
	const likeButton = card.querySelector(".card__like-button")
	const likesCount = card.querySelector(".card__likes-count")

	image.src = cardData.link
	image.alt = cardData.name
	title.textContent = cardData.name
	likesCount.textContent = cardData.likes.length

	if (userId === cardData.owner._id) {
		deleteButton.addEventListener("click", () => removeCard(card))
	} else {
		deleteButton.remove()
	}

	image.addEventListener("click", () => openImagePopup(name, link))
	likeButton.addEventListener("click", toggleLike)

	return card
}
