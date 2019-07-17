import { css, html, LitElement } from 'lit-element';

import 'weightless/icon';
import 'weightless/snackbar';

import './todo-header';
import './todo-item';
import './todo-create';

class TodoApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      taskList: { type: Array },
      error: { type: Boolean },
      token: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'to do app';
    this.taskList = [];
    this.addEventListener('login', this.login);
    this.addEventListener('logout', this.logout);
    this.addEventListener('create-task', this.createTask);
    this.addEventListener('delete-task', this.deleteTask);
    this.addEventListener('modify-task', this.modifyTask);
  }

  showError() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 2000);
  }

  get headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authenticate: `Bearer ${this.token}`,
    };
  }

  async getList() {
    super.connectedCallback();
    const response = await fetch('/api/task', {
      method: 'GET',
      headers: this.headers,
    });
    if (!response.ok) {
      this.showError();
    } else {
      this.taskList = await response.json();
    }
  }

  async login(e) {
    const response = await fetch('/auth', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(e.detail),
    });

    if (!response.ok) {
      this.showError();
    } else {
      this.token = (await response.json()).token;
      this.getList();
    }
  }

  logout() {
    this.token = undefined;
    this.taskList = [];
  }

  async createTask(e) {
    /* global uuid */
    const newTask = { text: e.detail.text, id: uuid() };
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      this.showError();
    } else {
      this.taskList = [...this.taskList, newTask];
    }
  }

  async deleteTask(e) {
    const response = await fetch(`/api/task/${e.detail.id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({ id: e.detail.id }),
    });

    if (!response.ok) {
      this.showError();
    } else {
      this.taskList = this.taskList.filter(task => task.id !== e.detail.id);
    }
  }

  async modifyTask(e) {
    let idFound;
    const newList = this.taskList.map(task => {
      if (task.id === e.detail.id) {
        idFound = e.detail.id;
        return {
          ...task,
          completed: e.detail.completed,
        };
      }
      return task;
    });
    const response = await fetch(`/api/task/${idFound}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ id: e.detail.id, completed: e.detail.completed }),
    });

    if (!response.ok) {
      this.showError();
    } else {
      this.taskList = newList;
    }
  }

  render() {
    return html`
      <todo-header token="${this.token ? this.token : ''}"></todo-header>

      ${this.token
        ? this.taskList.map(
            element => html`
              <todo-item
                id="${element.id}"
                text="${element.text}"
                ?completed=${element.completed}
              ></todo-item>
            `,
          )
        : html``}
      ${this.token
        ? html`
            <todo-create></todo-create>
          `
        : html``}
      ${!this.error
        ? html``
        : html`
            <wl-snackbar open>
              <wl-icon slot="icon">error_outline</wl-icon>
              <span>Error connecting DB</span>
            </wl-snackbar>
          `}
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

        wl-snackbar {
          position: absolute;
          bottom: 20px;
          width: 70%;
        }
      `,
    ];
  }
}

customElements.define('todo-app', TodoApp);
