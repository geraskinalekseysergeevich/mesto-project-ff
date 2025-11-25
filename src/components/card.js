export function createCard(template, name, link, handleImageClick) {
	const card = template.querySelector(".card").cloneNode(true)

	const image = card.querySelector(".card__image")
	const title = card.querySelector(".card__title")
	const deleteButton = card.querySelector(".card__delete-button")

	image.src = link
	image.alt = name
	title.textContent = name

	deleteButton.addEventListener("click", () => card.remove())
	image.addEventListener("click", () => handleImageClick(name, link))

	return card
}
