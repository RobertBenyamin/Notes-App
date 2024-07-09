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

  // Script moved from index.html
  const notesForm = document.querySelector('#notesForm');

  notesForm.addEventListener('cancel', () => {
    Utils.hideElement(notesForm);
  });

  notesForm.addEventListener('save', (event) => {
    const { title, description } = event.detail;
    // TODO: Save the note to the database
    Utils.hideElement(notesForm);
  });

  const showFormButton = document.createElement('button');
  showFormButton.textContent = 'Add Note';
  showFormButton.className = 'add-note-button';
  showFormButton.addEventListener('click', () => {
    Utils.showElement(notesForm);
  });
  document.body.appendChild(showFormButton);
};

export default home;
