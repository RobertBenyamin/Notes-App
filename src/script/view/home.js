import Utils from "../utils.js";
import formValidation from "./form-validation.js";
import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  const RENDER_EVENT = "RENDER_EVENT";

  const appBar = document.querySelector("app-bar");

  const homeButton = appBar.shadowRoot.querySelector("#homeButton");
  const noteSection = document.querySelector("#note");
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");
  const notesForm = document.querySelector("#notesForm");

  const archiveButton = appBar.shadowRoot.querySelector("#archiveButton");
  const archiveNoteSection = document.querySelector("#archiveNote");
  const archiveNoteListContainerElement = document.querySelector(
    "#archiveNoteListContainer",
  );
  const archiveNoteListElement =
    archiveNoteListContainerElement.querySelector("note-list");

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
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      displayResult(result, noteListElement);
      showNoteList();
    } catch (error) {}
  };

  const showArchivedNotes = async () => {
    try {
      const result = await NotesApi.getArchivedNotes();
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      displayResult(result, archiveNoteListElement);
      showArchivedNoteList();
    } catch (error) {}
  };

  const displayResult = (notes, listElement) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      noteItemElement.addEventListener("delete-note", (event) => {
        const { id } = event.detail;
        deleteNoteById(id);
      });
      return noteItemElement;
    });

    Utils.emptyElement(listElement);
    listElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showArchivedNoteList = () => {
    Array.from(archiveNoteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(archiveNoteListElement);
  }

  document.addEventListener(RENDER_EVENT, () => {
    showNotes();
  });

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

  homeButton.addEventListener("click", () => {
    Utils.showElement(noteSection);
    Utils.showElement(showFormButton);
    Utils.hideElement(archiveNoteSection);
    showNotes();
  });

  archiveButton.addEventListener("click", async () => {
    try {
      Utils.showElement(archiveNoteSection);
      Utils.hideElement(showFormButton);
      Utils.hideElement(noteSection);
      showArchivedNotes();
    } catch (error) {}
  });

  // Initial state
  formValidation();
  showNotes();
  Utils.hideElement(archiveNoteSection);
};

export default home;
