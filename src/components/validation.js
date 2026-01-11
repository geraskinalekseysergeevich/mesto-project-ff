const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add("popup__input_type_error")
	errorElement.textContent = errorMessage
}

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove("popup__input_type_error")
	errorElement.textContent = ""
}

const isValid = (formElement, inputElement, validationConfig) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage)
		return false
	}

	if (validationConfig.validationRegex) {
		if (!validationConfig.validationRegex.test(inputElement.value)) {
			showInputError(formElement, inputElement, validationConfig.errorMessage)
			return false
		}
	}

	hideInputError(formElement, inputElement)
	return true
}

const hasInvalidInput = (inputList, formElement, validationConfig) => {
	return inputList.some(inputElement => !isValid(formElement, inputElement, validationConfig))
}

const toggleButtonState = (formElement, inputList, validationConfig) => {
	const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)

	if (hasInvalidInput(inputList, formElement, validationConfig)) {
		buttonElement.classList.add(validationConfig.inactiveButtonClass)
		buttonElement.disabled = true
	} else {
		buttonElement.classList.remove(validationConfig.inactiveButtonClass)
		buttonElement.disabled = false
	}
}

const setEventListeners = (formElement, validationConfig) => {
	const inputList = Array.from(formElement.querySelectorAll(".popup__input"))

	const revalidateForm = () => {
		inputList.forEach(inputElement => {
			isValid(formElement, inputElement, validationConfig)
		})
		toggleButtonState(formElement, inputList, validationConfig)
	}

	inputList.forEach(inputElement => {
		inputElement.addEventListener("input", revalidateForm)
	})
}

export const enableValidation = validationConfig => {
	const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
	formList.forEach(formElement => {
		setEventListeners(formElement, validationConfig)
	})
}

export const clearValidation = (formElement, validationConfig) => {
	const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
	const submitButton = formElement.querySelector(validationConfig.submitButtonSelector)

	inputList.forEach(inputElement => {
		hideInputError(formElement, inputElement)
	})

	if (submitButton) {
		submitButton.classList.remove(validationConfig.inactiveButtonClass)
		submitButton.disabled = false
	}
}
