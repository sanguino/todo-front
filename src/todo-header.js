import { html, LitElement } from 'lit-element';
import 'weightless/banner';
import 'weightless/icon';
import 'weightless/button';

class TodoHeader extends LitElement {
  render() {
    return html`
      <wl-banner>
        <wl-icon slot="icon">account_box</wl-icon>
        <wl-button slot="action" flat inverted>Sign in</wl-button>
        <span>Not logged in, continue as guest</span>
      </wl-banner>
    `;
  }
}

customElements.define('todo-header', TodoHeader);
