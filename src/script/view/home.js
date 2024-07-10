import Utils from "../utils.js";
import Notes from "../data/local/notes.js";
import formValidation from "./form-validation.js";

const home = () => {
  let notes = [];
  const RENDER_EVENT = "RENDER_EVENT";
  const STORAGE_KEY = "NOTE_APPS";

  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const isStorageExist = () => {
    if (typeof Storage === undefined) {
      alert("Browser kamu tidak mendukung local storage");
      return false;
    }
    return true;
  };

  const saveData = () => {
    if (isStorageExist()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  };

  const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
      notes = data;
    } else {
      notes = Notes.getNotesAll();
      saveData();
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
  };

  const addNote = (note) => {
    notes.push(note);
    saveData();
  };

  const getArchivedNotes = () => {
    return notes
      .filter((note) => note.archived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getActiveNotes = () => {
    return notes
      .filter((note) => !note.archived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const searchActiveNotes = (query) => {
    const notesByTitle = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) && !note.archived
    );
    const notesByBody = notes.filter(
      (note) =>
        note.description.toLowerCase().includes(query.toLowerCase()) &&
        !note.archived
    );
    return [...new Set([...notesByTitle, ...notesByBody])];
  };

  const searchArchivedNotes = (query) => {
    const notesByTitle = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) && note.archived
    );
    const notesByBody = notes.filter(
      (note) =>
        note.description.toLowerCase().includes(query.toLowerCase()) &&
        note.archived
    );
    return [...new Set([...notesByTitle, ...notesByBody])];
  };

  const showNotes = (query) => {
    if (query === "") {
      const result = getActiveNotes();
      displayResult(result);
    } else {
      const result = searchActiveNotes(query);
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

  document.addEventListener(RENDER_EVENT, () => {
    showNotes("");
  });

  const notesForm = document.querySelector("#notesForm");

  notesForm.addEventListener("cancel", () => {
    Utils.hideElement(notesForm);
  });

  function generateId() {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "notes-";
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  notesForm.addEventListener("save", (event) => {
    const { title, description } = event.detail;
    const id = generateId();
    const createdAt = new Date().toISOString();
    const archived = false;
    addNote({
      id,
      title,
      body: description,
      createdAt,
      archived,
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
  if (isStorageExist()) {
    loadDataFromStorage();
  }
};

export default home;
