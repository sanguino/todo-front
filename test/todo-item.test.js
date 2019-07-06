import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/todo-item';

describe('<todo-item>', () => {
  describe('Properties', () => {
    it('allows property text to be set', async () => {
      const el = await fixture(
        html`
          <todo-item text="buy milk"></todo-item>
        `,
      );
      expect(el.text).to.equal('buy milk');
    });

    it('allows property id to be set', async () => {
      const el = await fixture(
        html`
          <todo-item id="a4df54"></todo-item>
        `,
      );
      expect(el.id).to.equal('a4df54');
    });

    it('allows property completed to be set as true', async () => {
      const el = await fixture(
        html`
          <todo-item completed></todo-item>
        `,
      );
      expect(el.completed).to.be.true;
    });

    it('allows property complete to be set as false', async () => {
      const el = await fixture(
        html`
          <todo-item></todo-item>
        `,
      );
      expect(!!el.completed).to.be.false;
    });
  });

  describe('modifyTask', () => {
    it("when click a taks, completed changes and event 'modify-task' is dispatched", async () => {
      const el = await fixture(
        html`
          <todo-item id="12" completed></todo-item>
        `,
      );
      sinon.spy(el, 'dispatchEvent');
      el.shadowRoot.querySelector('wl-list-item').click();
      expect(el.dispatchEvent.calledOnce).to.be.true;
      expect(el.completed).to.be.false;
    });
  });

  describe('deleteTask', () => {
    it("when delete button is clicked, event 'delete-task' is dispatched", async () => {
      const el = await fixture(
        html`
          <todo-item id="12"></todo-item>
        `,
      );
      sinon.spy(el, 'dispatchEvent');
      el.shadowRoot.querySelector('wl-button').click();
      expect(el.dispatchEvent.calledOnce).to.be.true;
    });
  });
});
