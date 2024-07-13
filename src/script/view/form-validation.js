const formValidation = () => {
  const formInput = document.querySelector("#notesForm");
  const nameFormInput = formInput.shadowRoot.querySelector("#title");
  const descriptionFormInput =
    formInput.shadowRoot.querySelector("#description");

  const blurEventHandler = (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? formInput.shadowRoot.querySelector("#" + connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  };

  // Validasi input nama
  const customValidationNameHandler = (event) => {
    event.target.setCustomValidity("");
    // Validasi jika tidak diisi
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Judul tidak boleh kosong!");
      return;
    }
  };

  nameFormInput.addEventListener("change", customValidationNameHandler);
  nameFormInput.addEventListener("invalid", customValidationNameHandler);
  nameFormInput.addEventListener("blur", blurEventHandler);

  // Validasi input deskripsi
  const customValidationDescriptionHandler = (event) => {
    event.target.setCustomValidity("");
    //  Validasi jika tidak diisi
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Deskripsi tidak boleh kosong!");
      return;
    }
  };

  descriptionFormInput.addEventListener(
    "change",
    customValidationDescriptionHandler,
  );
  descriptionFormInput.addEventListener(
    "invalid",
    customValidationDescriptionHandler,
  );
  descriptionFormInput.addEventListener("blur", blurEventHandler);
};

export default formValidation;
