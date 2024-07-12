const radioFields: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  ".contact-form__input-field--type-radio",
);

radioFields.forEach((radioField: HTMLDivElement) => {
  radioField.addEventListener("click", () => {
    (radioField.firstElementChild as HTMLInputElement | null)?.click();
  });
});

const sumbutBtn: HTMLButtonElement | null = document.querySelector(
  ".contact-form__submit-button",
);
const inputsText: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  ".contact-form__input--type-text",
);
const inputEmail: HTMLInputElement | null = document.querySelector(
  ".contact-form__input--type-email",
);
const inputFieldset: HTMLFieldSetElement | null = document.querySelector(
  ".contact-form__input-fieldset",
);
const inputRadios: NodeListOf<HTMLInputElement> | undefined =
  inputFieldset?.querySelectorAll(".contact-form__input--type-radio");
const inputTextArea: HTMLTextAreaElement | null = document.querySelector(
  ".contact-form__input--type-textarea",
);
const inputCheckbox: HTMLInputElement | null = document.querySelector(
  ".contact-form__input--type-checkbox",
);
const statusBar: HTMLDivElement | null = document.querySelector(
  ".contact-form__status-bar",
);

sumbutBtn?.addEventListener("click", (e: Event) => {
  e.preventDefault();

  inputsText.forEach((inputText: HTMLInputElement): void => {
    if (inputText.value.length === 0) {
      inputText.classList.add("contact-form__input--validation-error");
      inputText.parentElement
        ?.querySelector(".contact-form__input-validation-description")
        ?.classList.add(
          "contact-form__input-validation-description--validation-error",
        );
    } else {
      inputText.classList.remove("contact-form__input--validation-error");
      inputText.parentElement
        ?.querySelector(".contact-form__input-validation-description")
        ?.classList.remove(
          "contact-form__input-validation-description--validation-error",
        );
    }
  });

  if (!inputEmail?.value.match(/\S+@\S+\.\S+/g)) {
    inputEmail?.classList.add("contact-form__input--validation-error");
    inputEmail?.parentElement
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.add(
        "contact-form__input-validation-description--validation-error",
      );
  } else {
    inputEmail.classList.remove("contact-form__input--validation-error");
    inputEmail.parentElement
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.remove(
        "contact-form__input-validation-description--validation-error",
      );
  }

  if (
    inputRadios &&
    Array.from(inputRadios).every(
      (inputRadio: HTMLInputElement): boolean => !inputRadio.checked,
    )
  ) {
    inputFieldset
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.add(
        "contact-form__input-validation-description--validation-error",
      );
    inputFieldset
      ?.querySelector(".contact-form__input-field:last-of-type")
      ?.classList.add("contact-form__input-field--validation-failed-margin");
  } else {
    inputFieldset
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.remove(
        "contact-form__input-validation-description--validation-error",
      );
  }

  if (inputTextArea?.value.length === 0) {
    inputTextArea.classList.add("contact-form__input--validation-error");
    inputTextArea.parentElement
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.add(
        "contact-form__input-validation-description--validation-error",
      );
  } else {
    inputTextArea?.classList.remove("contact-form__input--validation-error");
    inputTextArea?.parentElement
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.remove(
        "contact-form__input-validation-description--validation-error",
      );
  }

  if (!inputCheckbox?.checked) {
    inputCheckbox?.classList.add("contact-form__input--validation-error");
    inputCheckbox
      ?.closest(".contact-form__input-field--type-checkbox")
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.add(
        "contact-form__input-validation-description--validation-error",
      );
    inputCheckbox?.parentElement?.classList.add(
      "contact-form__checkbox-container--validation-failed-margin",
    );
  } else {
    inputCheckbox.classList.remove("contact-form__input--validation-error");
    inputCheckbox
      .closest(".contact-form__input-field--type-checkbox")
      ?.querySelector(".contact-form__input-validation-description")
      ?.classList.remove(
        "contact-form__input-validation-description--validation-error",
      );
    inputCheckbox.parentElement?.classList.remove(
      "contact-form__checkbox-contair--validation-failed-margin",
    );
  }

  if (
    document.querySelectorAll(".contact-form__input--validation-error")
      .length === 0
  ) {
    statusBar?.classList.add("contact-form__status-bar--status-active");
  } else {
    statusBar?.classList.remove("contact-form__status-bar--status-active");
  }
});
