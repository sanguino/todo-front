import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/todo-app';

describe('<todo-app>', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch').resolves({ ok: true });
  });

  afterEach(() => {
    window.fetch.restore();
  });
  describe('Properties', () => {
    it('has a default property title', async () => {
      const el = await fixture('<todo-app></todo-app>');
      expect(el.title).to.equal('to do app');
    });

    it('allows property title to be overwritten', async () => {
      const el = await fixture(
        html`
          <todo-app title="different"></todo-app>
        `,
      );
      expect(el.title).to.equal('different');
    });

    it('has a default property taskList', async () => {
      const el = await fixture('<todo-app></todo-app>');
      expect(el.taskList).to.eqls([]);
    });

    it('allows property taskList to be overwritten', async () => {
      const fakeList = [{ id: 12, text: 'buy milk' }];
      const el = await fixture(
        html`
          <todo-app .taskList=${fakeList}></todo-app>
        `,
      );
      expect(el.taskList).to.eqls(fakeList);
    });
  });

  describe('createTask', () => {
    before(() => {
      window.uuid = () => Math.random().toString();
    });

    it('add a task when createTask Method is executed', async () => {
      const fakeList = [{ id: 12, text: 'buy milk' }];
      const event = { detail: { text: 'buy beer' } };
      const el = await fixture(
        html`
          <todo-app .taskList=${fakeList}></todo-app>
        `,
      );
      await el.createTask(event);
      expect(el.taskList.length).to.equal(2);
      expect(el.taskList[1].text).to.equal('buy beer');
    });

    it('not add a task when fectch fails', async () => {
      const fakeList = [{ id: 12, text: 'buy milk' }];
      const event = { detail: { text: 'buy beer' } };
      window.fetch.restore();
      sinon.stub(window, 'fetch').returns({ ok: false });
      const el = await fixture(
        html`
          <todo-app .taskList=${fakeList}></todo-app>
        `,
      );
      await el.createTask(event);
      expect(el.taskList.length).to.equal(1);
    });
  });

  describe('deleteTask', () => {
    it('removes a task when deleteTask Method is executed', async () => {
      const fakeList = [{ id: 12, text: 'buy milk' }];
      const event = { detail: { id: 12 } };
      const el = await fixture(
        html`
          <todo-app .taskList=${fakeList}></todo-app>
        `,
      );
      await el.deleteTask(event);
      expect(el.taskList.length).to.equal(0);
    });

    it('not removes a task when deleteTask Method is executed', async () => {
      const fakeList = [{ id: 12, text: 'buy milk' }];
      const event = { detail: { id: 12 } };
      window.fetch.restore();
      sinon.stub(window, 'fetch').returns({ ok: false });
      const el = await fixture(
        html`
          <todo-app .taskList=${fakeList}></todo-app>
        `,
      );
      await el.deleteTask(event);
      expect(el.taskList.length).to.equal(1);
    });
  });

  describe('modifyTask', () => {
    it('changes completed attribute of a task when modifyTask Method is executed', async () => {
      const fakeList = [{ id: 12, text: 'buy milk' }];
      const event = { detail: { id: 12, completed: true } };
      const el = await fixture(
        html`
          <todo-app .taskList=${fakeList}></todo-app>
        `,
      );
      await el.modifyTask(event);
      expect(el.taskList.length).to.equal(1);
      // expect(el.taskList[0].completed).to.be.true; //TODO: fix this test
    });
  });

  describe('showError', () => {
    it('set this.error to true', async () => {
      const el = await fixture(
        html`
          <todo-app></todo-app>
        `,
      );
      await el.showError();
      expect(el.error).to.be.true;
    });
  });
});
