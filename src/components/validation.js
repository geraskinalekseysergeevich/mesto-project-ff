const showInputError = (formElement, inputElement, inputErrorClass, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(inputErrorClass)
	errorElement.textContent = errorMessage
}

const hideInputError = (formElement, inputElement, inputErrorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(inputErrorClass)
	errorElement.textContent = ""
}

const isValid = (formElement, inputElement, validationConfig) => {
	const inputErrorClass = validationConfig.inputErrorClass
	const isTouched = inputElement.getAttribute("data-touched") === "true"

	if (!inputElement.validity.valid) {
		if (isTouched) {
			showInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage)
		}
		return false
	}

	if (
		inputElement.dataset.regex !== undefined &&
		validationConfig.validationRegex &&
		!validationConfig.validationRegex.test(inputElement.value)
	) {
		if (isTouched) {
			showInputError(formElement, inputElement, inputErrorClass, validationConfig.errorMessage)
		}
		return false
	}

	hideInputError(formElement, inputElement, inputErrorClass)
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
		inputElement.addEventListener("input", () => {
			inputElement.setAttribute("data-touched", "true")
			revalidateForm()
		})

		inputElement.addEventListener("blur", () => {
			inputElement.setAttribute("data-touched", "true")
			revalidateForm()
		})
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

	inputList.forEach(inputElement => {
		hideInputError(formElement, inputElement, validationConfig.inputErrorClass)
		inputElement.removeAttribute("data-touched")
	})

	toggleButtonState(formElement, inputList, validationConfig)
}
