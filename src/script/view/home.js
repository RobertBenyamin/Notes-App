import Utils from "../utils.js";
import formValidation from "./form-validation.js";
import NotesApi from "../data/remote/notes-api.js";
import Swal from "sweetalert2";

const home = () => {
  const RENDER_EVENT = "RENDER_EVENT";

  const appBar = document.querySelector("app-bar");

  const homeButton = appBar.shadowRoot.querySelector("#homeButton");
  const noteSection = document.querySelector("#note");
  const noteLoadingElement = noteSection.querySelector("#loadingIndicator");
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");
  const notesForm = document.querySelector("#notesForm");

  const archiveButton = appBar.shadowRoot.querySelector("#archiveButton");
  const archiveNoteSection = document.querySelector("#archiveNote");
  const archiveNoteLoadingElement =
    archiveNoteSection.querySelector("#loadingIndicator");
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
      Swal.fire({
        title: "Note created!",
        icon: "success",
      });
      document.dispatchEvent(new Event(RENDER_EVENT));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const deleteNoteById = async (id) => {
    try {
      const result = await NotesApi.deleteNoteById(id);
      Swal.fire({
        title: "Note deleted!",
        icon: "success",
      });
      document.dispatchEvent(new Event(RENDER_EVENT));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const showNoteLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showArchiveNoteLoading = () => {
    Array.from(archiveNoteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(archiveNoteLoadingElement);
  };

  const showNotes = async () => {
    showNoteLoading();
    try {
      const result = await NotesApi.getNotes();
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      displayResult(result, noteListElement);
      showNoteList();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      noteLoadingElement.innerHTML = "Failed to load notes!";
    }
  };

  const showArchivedNotes = async () => {
    showArchiveNoteLoading();
    try {
      const result = await NotesApi.getArchivedNotes();
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      displayResult(result, archiveNoteListElement);
      showArchivedNoteList();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      archiveNoteLoadingElement.innerHTML = "Failed to load archived notes!";
    }
  };

  const archiveNoteById = async (id) => {
    try {
      const result = await NotesApi.getNoteById(id);
      if (result.archived) {
        await NotesApi.unarchiveNote(id);
        Swal.fire({
          title: "Note unarchived!",
          icon: "success",
        });
      } else {
        await NotesApi.archiveNote(id);
        Swal.fire({
          title: "Note archived!",
          icon: "success",
        });
      }
      document.dispatchEvent(new Event(RENDER_EVENT));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const displayResult = (notes, listElement) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      noteItemElement.addEventListener("delete-note", (event) => {
        const { id } = event.detail;
        deleteNoteById(id);
      });
      noteItemElement.addEventListener("archive-note", (event) => {
        const { id } = event.detail;
        archiveNoteById(id);
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
  };

  document.addEventListener(RENDER_EVENT, () => {
    showNotes();
    showArchivedNotes();
  });

  notesForm.addEventListener("cancel", () => {
    Utils.hideElementWithAnimation(notesForm);
  });

  notesForm.addEventListener("save", (event) => {
    const { title, description } = event.detail;
    addNote({
      title,
      description,
    });
    Utils.hideElementWithAnimation(notesForm);
  });

  const showFormButton = document.createElement("button");
  showFormButton.textContent = "Add Note";
  showFormButton.className = "add-note-button";
  showFormButton.addEventListener("click", () => {
    Utils.showElementWithAnimation(notesForm);
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  });

  // Initial state
  formValidation();
  showNotes();
  Utils.hideElement(archiveNoteSection);
};

export default home;
