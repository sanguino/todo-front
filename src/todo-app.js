import { css, html, LitElement } from 'lit-element';

import './todo-header';
import './todo-item';
import './todo-create';

class TodoApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      taskList: { type: Array },
    };
  }

  constructor() {
    super();
    this.taskList = [];
    this.title = 'to do app';
    this.addEventListener('create-task', this.createTask);
    this.addEventListener('delete-task', this.deleteTask);
    this.addEventListener('modify-task', this.modifyTask);
  }

  createTask(e) {
    /* global uuidv4 */
    this.taskList = [...this.taskList, { text: e.detail.text, id: uuidv4() }];
  }

  deleteTask(e) {
    this.taskList = this.taskList.filter(task => task.id !== e.detail.id);
  }

  modifyTask(e) {
    this.taskList = this.taskList.map(task => {
      if (task.id === e.detail.id) {
        return {
          ...task,
          completed: e.detail.completed,
        };
      }
      return task;
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
