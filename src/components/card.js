export function toggleLike(evt) {
	evt.target.classList.toggle("card__like-button_is-active")
}

export function removeCard(cardElement) {
	cardElement.remove()
}

export function createCard(template, name, link, openImagePopup) {
	const card = template.querySelector(".card").cloneNode(true)

	const image = card.querySelector(".card__image")
	const title = card.querySelector(".card__title")
	const deleteButton = card.querySelector(".card__delete-button")
	const likeButton = card.querySelector(".card__like-button")

	image.src = link
	image.alt = name
	title.textContent = name

	deleteButton.addEventListener("click", () => removeCard(card))
	image.addEventListener("click", () => openImagePopup(name, link))
	likeButton.addEventListener("click", toggleLike)

	return card
}
