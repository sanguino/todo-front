import { css, html, LitElement } from 'lit-element';
import 'weightless/button';
import 'weightless/textfield';

class TodoCreate extends LitElement {
  createTask() {
    const tf = this.shadowRoot.querySelector('wl-textfield');
    this.dispatchEvent(
      new CustomEvent('create-task', {
        detail: { text: tf.value },
        composed: true,
      }),
    );
    tf.value = '';
  }

  render() {
    return html`
      <form @submit=${e => e.preventDefault()}>
        <wl-textfield></wl-textfield>
        <wl-button fab outlined @click=${this.createTask}><wl-icon>add</wl-icon></wl-button>
      </form>
    `;
  }

  static get styles() {
    return [
      css`
        form {
          display: inline-flex;
          align-items: stretch;
          justify-content: space-between;
          width: 100%;
        }

        wl-textfield {
          width: 90%;
        }
      `,
    ];
  }
}

customElements.define('todo-create', TodoCreate);
