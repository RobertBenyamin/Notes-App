import Utils from "../utils.js";

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    // Re-render
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
          border-radius: 8px;
          background: #fff7e6;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
          overflow: hidden;
          margin-bottom: 16px;
        }
  
        .note {
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
  
        .note__details {
          margin-bottom: 8px;
        }
  
        .note__title {
          font-weight: bold;
          margin: 0 0 8px 0;
        }
  
        .note__body {
          margin: 0 0 8px 0;
        }
  
        .note__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
  
        .note__createdAt {
          margin: 0;
          font-size: 0.85em;
          color: gray;
        }
  
        .note__actions {
          display: flex;
          gap: 8px;
        }
  
        .note__actions svg {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    const formattedDate = Utils.formatDate(this._note.createdAt);

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="note">
          <div class="note__details">
            <h2 class="note__title">${this._note.title}</h2>
            <p class="note__body">${this._note.body}</p>
          </div>
          <div class="note__footer">
            <p class="note__createdAt">${formattedDate}</p>
            <div class="note__actions">
              <svg title="Delete" id="delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><title>Delete</title><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              <svg title="Archive" id="archive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive"><title>Archive</title><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
            </div>
          </div>
        </div>
      `;
    this.shadowRoot.querySelector("#delete").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("delete-note", {
          detail: {
            id: this._note.id,
          },
        }),
      );
    });
    this.shadowRoot.querySelector("#archive").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("archive-note", {
          detail: {
            id: this._note.id,
          },
        }),
      );
    });
  }
}

customElements.define("note-item", NoteItem);
