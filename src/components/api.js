const config = {
	baseUrl: process.env.API_BASE_URL,
	headers: {
		authorization: process.env.USER_TOKEN,
		"Content-Type": "application/json",
	},
}

const baseFetch = (path, options = {}) => {
	const fetchOptions = {
		headers: {
			...config.headers,
			...options.headers,
		},
		...options,
	}
	return fetch(`${config.baseUrl}${path}`, fetchOptions).then(res => {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`)
		}

		return res.json()
	})
}

export const getUserProfile = () => {
	return baseFetch("/users/me")
}

export const getCards = () => {
	return baseFetch("/cards")
}

export const patchUserProfile = (name, about) => {
	return baseFetch("/users/me", {
		method: "PATCH",
		body: JSON.stringify({ name, about }),
	})
}

export const postCard = (name, link) => {
	return baseFetch("/cards", {
		method: "POST",
		body: JSON.stringify({ name, link }),
	})
}

export const deleteCard = cardId => {
	return baseFetch(`/cards/${cardId}`, {
		method: "DELETE",
	})
}

export const putLike = cardId => {
	return baseFetch(`/cards/likes/${cardId}`, {
		method: "PUT",
	})
}

export const deleteLike = cardId => {
	return baseFetch(`/cards/likes/${cardId}`, {
		method: "DELETE",
	})
}

export const patchAvatar = avatar => {
	return baseFetch("/users/me/avatar", {
		method: "PATCH",
		body: JSON.stringify({ avatar }),
	})
}
