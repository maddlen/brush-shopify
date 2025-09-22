export type ValidationErrors = Record<string, string[]>;

class FormValidator {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  clearErrors() {
    this.container.querySelectorAll("[validator-error]").forEach((el) => el.remove());
  }

  showErrors(errors: ValidationErrors) {
    for (const [field, messages] of Object.entries(errors)) {
      const input = this.container.querySelector<HTMLElement>(`[validator-field="${field}"]`);

      if (input) {
        // Create error message element
        const error = document.createElement("span");
        error.textContent = $t(messages[0]);
        error.setAttribute("validator-error", "");

        // Insert error message after input
        input.insertAdjacentElement("afterend", error);
      }
    }
  }
}

export default { FormValidator };
