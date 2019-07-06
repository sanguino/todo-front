import { css, html, LitElement } from 'lit-element';

import 'weightless/icon';
import 'weightless/button';
import 'weightless/list-item';

class TodoItem extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      id: { type: String },
      completed: { type: Boolean },
    };
  }

  modifyTask() {
    this.completed = !this.completed;
    this.dispatchEvent(
      new CustomEvent('modify-task', {
        detail: { id: this.id, completed: this.completed },
        composed: true,
      }),
    );
  }

  deleteTask(e) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('delete-task', {
        detail: { id: this.id },
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <wl-list-item active @click=${this.modifyTask}>
        <wl-icon slot="before">${this.completed ? 'check_box' : 'check_box_outline_blank'}</wl-icon>
        <wl-button slot="after" flat inverted @click=${this.deleteTask}>
          <wl-icon>delete_forever</wl-icon>
        </wl-button>
        <wl-title level="4" class="task ${this.completed ? 'completed' : ''}"
          >${this.text}</wl-title
        >
      </wl-list-item>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin: 10px 0;
        }

        .task {
          font-weight: bold;
          pointer-events: none;
        }

        .completed {
          text-decoration: line-through;
          color: gray;
        }
      `,
    ];
  }
}

customElements.define('todo-item', TodoItem);
