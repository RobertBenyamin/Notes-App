class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
          width: 100%;
          
          color: black;
          
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
        }
  
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
        }
  
        .brand-name {
          margin: 0;
          font-size: 1.7em;
        }
  
        button {
          padding: 10px 20px;
          background-color: transparent;
          border: none;
          border-radius: 4px;
          color: black;
          cursor: pointer;
          font-size: 1em;
          font-weight: bold;
          transition: background-color 0.3s;
        }
  
        button:hover {
          background-color: transparent;
          color: #82590b;
        }
      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
        <div>
          <button id="homeButton" type="button" class="brand-name">Notes App</button>
          <button id="archiveButton" type="button">Archive</button>
        </div>
      `;
  }
}

customElements.define("app-bar", AppBar);
