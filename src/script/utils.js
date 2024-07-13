import { animate } from "motion";

class Utils {
  static emptyElement(element) {
    element.innerHTML = "";
  }

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static showElementWithAnimation(element) {
    element.style.display = "block";
    animate(
      element,
      { opacity: [0, 1], transform: ["scale(0.9)", "scale(1)"] },
      { duration: 0.3 },
    );
  }

  static hideElementWithAnimation(element) {
    animate(
      element,
      { opacity: [1, 0], transform: ["scale(1)", "scale(0.9)"] },
      { duration: 0.3 },
      {
        onComplete: () => {
          element.style.display = "none";
        },
      },
    );
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }

  static formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  }
}

export default Utils;
