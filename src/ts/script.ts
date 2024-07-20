// HTML Elements
const radioFieldset: HTMLFieldSetElement | null = document.querySelector(
  ".contact-form__input-fieldset",
);

const submitButton: HTMLButtonElement | null = document.querySelector(
  ".contact-form__button--type-submit",
);
const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  ".contact-form__input",
);
const emailInput: HTMLInputElement | null = document.querySelector(
  ".contact-form__input--type-email",
);
const radioInputs: NodeListOf<HTMLInputElement> | undefined =
  radioFieldset?.querySelectorAll(".contact-form__input--type-radio");
const checkboxInput: HTMLInputElement | null = document.querySelector(
  ".contact-form__input--type-checkbox",
);
const formSubmittedAlert: HTMLDialogElement | null = document.querySelector(
  ".alert--type-form-submitted",
);
const contactForm: HTMLFormElement | null = document.querySelector(
  ".contact-form__body",
);

// Event Handlers
// Activating Radios on field click
radioFieldset?.addEventListener("click", (e: MouseEvent): void => {
  if (e.target instanceof Element) {
    if (e.target.classList.contains("contact-form__input-field--type-radio"))
      (
        e.target.querySelector(
          ".contact-form__input--type-radio",
        ) as HTMLInputElement
      ).click();
  }
});

// Form Submit
submitButton?.addEventListener("click", (e: MouseEvent): void => {
  e.preventDefault();

  // Hiding all validation error messages
  document
    .querySelectorAll(".contact-form__input-validation-error-message")
    .forEach((message: Element): void => {
      message.classList.remove(
        "contact-form__input-validation-error-message--visible",
      );
    });

  // Checking for empty inputs
  inputs.forEach((input: HTMLInputElement): void => {
    if (input.value === "")
      input.parentElement
        ?.querySelector(".contact-form__input-validation-error-message")
        ?.classList.add(
          "contact-form__input-validation-error-message--visible",
        );
  });

  // Validating email input field
  if (
    !emailInput?.value.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    )
  )
    emailInput?.parentElement
      ?.querySelector(".contact-form__input-validation-error-message")
      ?.classList.add("contact-form__input-validation-error-message--visible");

  // Validating radio input field
  if (
    radioInputs &&
    Array.from(radioInputs).every(
      (radioInput: HTMLInputElement): boolean => !radioInput.checked,
    )
  )
    radioFieldset
      ?.querySelector(".contact-form__input-validation-error-message")
      ?.classList.add("contact-form__input-validation-error-message--visible");

  // Validating checkbox input field
  if (!checkboxInput?.checked)
    checkboxInput?.parentElement?.parentElement
      ?.querySelector(".contact-form__input-validation-error-message")
      ?.classList.add("contact-form__input-validation-error-message--visible");

  // Showing and closing alert
  if (
    !document.querySelector(
      ".contact-form__input-validation-error-message--visible",
    )
  ) {
    formSubmittedAlert?.show();
    contactForm?.reset();
    setTimeout((): void => {
      formSubmittedAlert?.close();
    }, 2000);
  }
});
