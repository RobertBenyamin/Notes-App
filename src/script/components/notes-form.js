class NotesForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        background: #fffad3;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        padding: 16px;
        display: none; /* hidden by default */
      }

      div {
        padding: 8px 16px 8px 16px; 
      }

      input[type="text"],
      textarea {
        width: calc(100% - 32px);
        height: auto;
        padding: 8px;
        margin-bottom: 12px;
        border: 1px solid #865d13;
        border-radius: 4px;
        outline: none;
        background: transparent;
      }

      textarea {
        resize: none;
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }

      .buttons button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .buttons button.cancel {
        background-color: #ffe7e2;
        color: #792b1f;
        font-weight: bold;
      }

      .buttons button.save {
        background-color: #edffdf;
        color: #44652c;
        font-weight: bold;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  static get observedAttributes() {
    return ["title"];
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div>
          <form id="notesForm">
            <h2 id="form-title">${this.getAttribute("title")}</h2>
            <input type="text" id="title" name="title" placeholder="Title" required>
            <textarea id="description" name="description" placeholder="Description" rows="10"></textarea>
            <div class="buttons">
              <button class="cancel" type="reset">Cancel</button>
              <button class="save" type="submit">Save</button>
            </div>
          </form>
        </div>
      `;

    this.shadowRoot.querySelector(".cancel").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("cancel"));
    });

    this.shadowRoot.querySelector(".save").addEventListener("click", () => {
      const title = this.shadowRoot.querySelector("#title").value;
      const description = this.shadowRoot.querySelector("#description").value;
      this.dispatchEvent(
        new CustomEvent("save", { detail: { title, description } })
      );
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.shadowRoot.querySelector("#form-title").textContent = newValue;
    }
    this.render();
  }
}

customElements.define("notes-form", NotesForm);
