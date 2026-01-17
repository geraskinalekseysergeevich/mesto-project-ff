import { deleteCard, deleteLike, putLike } from "./api"

const isCardLiked = (userId, cardData) => {
	return cardData.likes.some(item => item._id === userId)
}

export const toggleLike = async (evt, userId, cardData) => {
	const likeButton = evt.target
	const likesCount = likeButton.closest(".card").querySelector(".card__likes-count")
	try {
		const updatedCard = isCardLiked(userId, cardData) ? await deleteLike(cardData._id) : await putLike(cardData._id)
		cardData.likes = updatedCard.likes
		likesCount.textContent = cardData.likes.length
		likeButton.classList.toggle("card__like-button_is-active", isCardLiked(userId, cardData))
	} catch (err) {
		console.error("Ошибка при добавлении или удалении лайка:", err)
	}
}

export const removeCard = async cardToDelete => {
	try {
		await deleteCard(cardToDelete.cardId)
		cardToDelete.cardElement.remove()
	} catch (err) {
		console.error("Ошибка при удалении карточки:", err)
	}
}

export const createCard = ({ template, userId, cardData, openImagePopup }) => {
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

	likeButton.classList.toggle("card__like-button_is-active", isCardLiked(userId, cardData))

	if (userId === cardData.owner._id) {
		deleteButton.addEventListener("click", () => {
			card.dispatchEvent(
				new CustomEvent("card:delete-request", {
					bubbles: true,
					detail: {
						cardElement: card,
						cardId: cardData._id,
					},
				})
			)
		})
	} else {
		deleteButton.remove()
	}

	image.addEventListener("click", () => openImagePopup(cardData.name, cardData.link))
	likeButton.addEventListener("click", evt => toggleLike(evt, userId, cardData))

	return card
}
