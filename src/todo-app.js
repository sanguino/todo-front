import { css, html, LitElement } from 'lit-element';

import './todo-header';
import './todo-item';
import './todo-create';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

class TodoApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      taskList: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'to do app';
    this.taskList = [];
    this.addEventListener('create-task', this.createTask);
    this.addEventListener('delete-task', this.deleteTask);
    this.addEventListener('modify-task', this.modifyTask);
  }

  async connectedCallback() {
    super.connectedCallback();
    const res = await fetch('/api/task', {
      method: 'GET',
      headers,
    });
    this.taskList = await res.json();
  }

  async createTask(e) {
    /* global uuid */
    const newTask = { text: e.detail.text, id: uuid() };
    this.taskList = [...this.taskList, newTask];
    await fetch('/api/task', {
      method: 'POST',
      headers,
      body: JSON.stringify(newTask),
    });
  }

  async deleteTask(e) {
    this.taskList = this.taskList.filter(task => task.id !== e.detail.id);
    await fetch(`/api/task/${e.detail.id}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ id: e.detail.id }),
    });
  }

  async modifyTask(e) {
    let idFound;
    this.taskList = this.taskList.map(task => {
      if (task.id === e.detail.id) {
        idFound = e.detail.id;
        return {
          ...task,
          completed: e.detail.completed,
        };
      }
      return task;
    });
    await fetch(`/api/task/${idFound}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ id: e.detail.id, completed: e.detail.completed }),
    });
  }

  render() {
    return html`
      <todo-header></todo-header>

      ${this.taskList.map(
        element => html`
          <todo-item
            id="${element.id}"
            text="${element.text}"
            ?completed=${element.completed}
          ></todo-item>
        `,
      )}

      <todo-create></todo-create>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
          max-width: 900px;
          display: block;
          min-width: 450px;
        }

        todo-create {
          display: block;
          margin-top: 20px;
        }
      `,
    ];
  }
}

customElements.define('todo-app', TodoApp);
