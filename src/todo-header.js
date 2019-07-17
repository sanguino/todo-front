import { css, html, LitElement } from 'lit-element';
import 'weightless/banner';
import 'weightless/icon';
import 'weightless/button';
import 'weightless/textfield';
import 'weightless/card';

class TodoHeader extends LitElement {
  static get properties() {
    return {
      token: { type: String },
      user: { type: String },
    };
  }

  login(e) {
    e.preventDefault();
    const user = this.shadowRoot.querySelector('wl-textfield[name="user"]');
    const pass = this.shadowRoot.querySelector('wl-textfield[name="pass"]');
    this.user = user.value;
    this.dispatchEvent(
      new CustomEvent('login', {
        detail: {
          username: user.value,
          password: pass.value,
        },
        composed: true,
      }),
    );
  }

  logout() {
    this.dispatchEvent(new CustomEvent('logout', { composed: true }));
  }

  render() {
    return this.token
      ? html`
          <wl-banner>
            <wl-icon slot="icon">verified_user</wl-icon>
            <wl-button slot="action" flat inverted @click=${this.logout}>Sign out</wl-button>
            <span>Task list of ${this.user}</span>
          </wl-banner>
        `
      : html`
          <wl-banner>
            <wl-icon slot="icon">account_circle</wl-icon>
            <span>Not logged in</span>
            <form slot="action" @submit=${this.login}>
              <wl-textfield name="user" required label="User" type="text"></wl-textfield>
              <wl-textfield name="pass" required label="Password" type="password"></wl-textfield>
              <wl-button>Log in</wl-button>
            </form>
          </wl-banner>
        `;
  }

  static get styles() {
    return [
      css`
        form {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding-bottom: 10px;
        }
        form * {
          margin-right: 10px;
        }
      `,
    ];
  }
}

customElements.define('todo-header', TodoHeader);
