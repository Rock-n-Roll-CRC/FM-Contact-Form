const radioFields: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  ".contact-form__input-field--type-radio",
);

radioFields.forEach((radioField: HTMLDivElement) => {
  radioField.addEventListener("click", () => {
    (radioField.firstElementChild as HTMLInputElement | null)?.click();
  });
});
