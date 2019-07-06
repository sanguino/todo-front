import { expect, fixture, html } from '@open-wc/testing';
import '../src/todo-create';
import sinon from 'sinon';

describe('<todo-create>', () => {
  describe('createTask', () => {
    it('when create button is clicked, and input has no text, none event is dispatched', async () => {
      const el = await fixture(
        html`
          <todo-create></todo-create>
        `,
      );
      sinon.spy(el, 'dispatchEvent');
      el.shadowRoot.querySelector('wl-textfield ').value = '';
      el.shadowRoot.querySelector('wl-button').click();
      expect(el.dispatchEvent.called).to.be.false;
    });

    it("when create button is clicked, and input has any text, event 'create-task' is dispatched", async () => {
      const el = await fixture(
        html`
          <todo-create></todo-create>
        `,
      );
      sinon.spy(el, 'dispatchEvent');
      el.shadowRoot.querySelector('wl-textfield ').value = 'buy beer';
      el.shadowRoot.querySelector('wl-button').click();
      expect(el.dispatchEvent.calledOnce).to.be.true;
    });

    it.skip("when input has any text and enter is pressed, event 'create-task' is dispatched", async () => {
      const el = await fixture(
        html`
          <todo-create></todo-create>
        `,
      );
      sinon.spy(el, 'dispatchEvent');
      el.shadowRoot.querySelector('wl-textfield ').value = 'buy beer';
      el.shadowRoot
        .querySelector('wl-textfield ')
        .dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      expect(el.dispatchEvent.calledOnce).to.be.true;
      // TODO: the key event is not dispatched, fix it and reactivate this test.
    });
  });
});
