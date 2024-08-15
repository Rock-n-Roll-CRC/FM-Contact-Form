/* Resseting error styles and error messages: */
export const resetValidationErrors = (
  errorMessages: HTMLParagraphElement[],
  inputsInvalidated: (HTMLInputElement | HTMLTextAreaElement)[],
): void => {
  errorMessages.forEach((errorMessage: HTMLParagraphElement): void => {
    errorMessage.classList.remove(
      "contact-form__input-validation-error-message--visible",
    );
  });

  inputsInvalidated.forEach(
    (inputInvalidated: HTMLInputElement | HTMLTextAreaElement): void => {
      inputInvalidated.classList.remove("contact-form__input--invalidated");
    },
  );
};

/* Render error styles & messages: */
export const renderValidationError = (inputField: HTMLDivElement): void => {
  inputField
    .querySelector(".contact-form__input-validation-error-message")
    ?.classList.add("contact-form__input-validation-error-message--visible");

  if (
    inputField.classList.contains("contact-form__input-field--type-text") ||
    inputField.classList.contains("contact-form__input-field--type-email") ||
    inputField.classList.contains("contact-form__input-field--type-textarea")
  ) {
    inputField
      .querySelector(".contact-form__input")
      ?.classList.add("contact-form__input--invalidated");
  }
};

/* Invalidating empty/unchecked required inputs: */
export const invalidateEmptyRequiredInputs = (
  inputsRequired: (HTMLInputElement | HTMLTextAreaElement)[],
): void => {
  inputsRequired.forEach(
    (inputRequired: HTMLInputElement | HTMLTextAreaElement): void => {
      if (
        inputRequired.value === "" ||
        (inputRequired.matches(".contact-form__input--type-checkbox") &&
          inputRequired instanceof HTMLInputElement &&
          !inputRequired.checked)
      ) {
        const inputField: HTMLDivElement | null = inputRequired.closest(
          ".contact-form__input-field",
        );

        if (inputField) renderValidationError(inputField);
      }
    },
  );
};

/* Validating email inputs: */
export const validateEmailInput = (emailInput: HTMLInputElement): void => {
  const VALIDATION_REGEXP = new RegExp(
    // eslint-disable-next-line no-control-regex
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]))$/,
    "g",
  );

  if (!VALIDATION_REGEXP.exec(emailInput.value)) {
    const inputField: HTMLDivElement | null = emailInput.closest(
      ".contact-form__input-field",
    );

    if (inputField) renderValidationError(inputField);
  }
};

/* Validating required radio fieldsets: */
export const validateRequiredRadioFieldsets = (
  fieldsetsRadioRequired: HTMLFieldSetElement[],
): void => {
  fieldsetsRadioRequired.forEach(
    (fieldsetRadioRequired: HTMLFieldSetElement): void => {
      const radioInputs: HTMLInputElement[] = Array.from(
        fieldsetRadioRequired.querySelectorAll(
          ".contact-form__input--type-radio",
        ),
      );

      if (
        radioInputs.every(
          (radioInput: HTMLInputElement): boolean => !radioInput.checked,
        )
      ) {
        const inputFieldGroup: HTMLDivElement | null =
          fieldsetRadioRequired.closest(".contact-form__input-field-group");

        if (inputFieldGroup) renderValidationError(inputFieldGroup);
      }
    },
  );
};

/* Showing alert on successful form validation: */
export const showValidationAlert = (
  alertValidation: HTMLDialogElement,
  form: HTMLFormElement,
): void => {
  if (
    Array.from(
      form.querySelectorAll(
        ".contact-form__input-validation-error-message--visible",
      ),
    ).length === 0
  ) {
    form.reset();
    alertValidation.show();
    setTimeout((): void => {
      alertValidation.close();
    }, 2000);
  }
};
