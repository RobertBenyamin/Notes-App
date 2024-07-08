import Utils from "../utils.js";
import Notes from "../data/local/notes.js";

const home = () => {
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const showNotes = (query) => {
    if (query === "") {
      const result = Notes.getActiveNotes();
      displayResult(result);
    } else {
      const result = Notes.searchActiveNotes(query);
      displayResult(result);
    }

    showNoteList();
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  showNotes("");
};

export default home;
