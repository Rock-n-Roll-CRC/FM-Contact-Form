import * as utils from "./utils.js";

const form: HTMLFormElement | null = document.querySelector(
  ".contact-form__form",
);

form?.addEventListener("click", (e: MouseEvent): void => {
  /* Activating the radio when clicking on an input field: */
  if (
    e.target instanceof HTMLElement &&
    e.target.matches(".contact-form__input-field--type-radio")
  ) {
    const radioInput: HTMLInputElement | null = e.target.querySelector(
      ".contact-form__input--type-radio",
    );

    radioInput?.click();
  }

  /* Handling form submit: */
  if (
    e.target instanceof HTMLButtonElement &&
    e.target.matches(".contact-form__submit-button")
  ) {
    /* Preventing default submit behaviour: */
    e.preventDefault();

    /* Selecting form elements: */
    const alertValidation: HTMLDialogElement | null | undefined = form
      .closest(".contact-form")
      ?.querySelector(".contact-form__alert--type-form-validated");
    const emailInput: HTMLInputElement | null = form.querySelector(
      ".contact-form__input--type-email",
    );
    const fieldsetsRadioRequired: HTMLFieldSetElement[] = Array.from(
      form.querySelectorAll(
        '.contact-form__input-fieldset--type-radio[aria-required="true"]',
      ),
    );
    const inputsRequired: (HTMLInputElement | HTMLTextAreaElement)[] =
      Array.from(form.querySelectorAll(".contact-form__input[required]"));
    const inputsInvalidated: (HTMLInputElement | HTMLTextAreaElement)[] =
      Array.from(form.querySelectorAll(".contact-form__input--invalidated"));
    const errorMessagesValidation: HTMLParagraphElement[] = Array.from(
      form.querySelectorAll(".contact-form__input-validation-error-message"),
    );

    /* Resseting error styles and error messages: */
    utils.resetValidationErrors(errorMessagesValidation, inputsInvalidated);

    /* Invalidating empty/unchecked required inputs: */
    utils.invalidateEmptyRequiredInputs(inputsRequired);

    /* Validating email inputs: */
    if (emailInput) utils.validateEmailInput(emailInput);

    /* Validating required radio fieldsets: */
    utils.validateRequiredRadioFieldsets(fieldsetsRadioRequired);

    /* Showing alert on successful form validation: */
    if (alertValidation) utils.showValidationAlert(alertValidation, form);
  }
});
