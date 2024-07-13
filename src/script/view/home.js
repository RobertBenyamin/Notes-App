import Utils from "../utils.js";
import formValidation from "./form-validation.js";
import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  const RENDER_EVENT = "RENDER_EVENT";

  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const addNote = async (note) => {
    try {
      const result = await NotesApi.addNote({
        title: note.title,
        body: note.description,
      });
      document.dispatchEvent(new Event(RENDER_EVENT));
    } catch (error) {}
  };

  const deleteNoteById = async (id) => {
    const result = await NotesApi.deleteNoteById(id);
    document.dispatchEvent(new Event(RENDER_EVENT));
  };

  const showNotes = async () => {
    try {
      const result = await NotesApi.getNotes();
      displayResult(result);
      showNoteList();
    } catch (error) {}
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      noteItemElement.addEventListener("delete-note", (event) => {
        const { id } = event.detail;
        deleteNoteById(id);
      });
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

  document.addEventListener(RENDER_EVENT, () => {
    showNotes();
  });

  const notesForm = document.querySelector("#notesForm");

  notesForm.addEventListener("cancel", () => {
    Utils.hideElement(notesForm);
  });

  notesForm.addEventListener("save", (event) => {
    const { title, description } = event.detail;
    addNote({
      title,
      description,
    });
    Utils.hideElement(notesForm);
  });

  const showFormButton = document.createElement("button");
  showFormButton.textContent = "Add Note";
  showFormButton.className = "add-note-button";
  showFormButton.addEventListener("click", () => {
    Utils.showElement(notesForm);
  });
  document.body.appendChild(showFormButton);

  formValidation();
};

export default home;
