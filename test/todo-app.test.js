import { expect, fixture, html } from '@open-wc/testing';
import '../src/todo-app';

describe('<todo-app>', () => {
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
      window.uuidv4 = () => Math.random().toString();
    });

    it('add a task when createTask Method is executed', async () => {
      const fakeList = [{ id: 12, text: 'buy milk' }];
      const event = { detail: { text: 'buy beer' } };
      const el = await fixture(
        html`
          <todo-app .taskList=${fakeList}></todo-app>
        `,
      );
      el.createTask(event);
      expect(el.taskList.length).to.equal(2);
      expect(el.taskList[1].text).to.equal('buy beer');
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
      el.deleteTask(event);
      expect(el.taskList.length).to.equal(0);
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
      el.modifyTask(event);
      expect(el.taskList.length).to.equal(1);
      expect(el.taskList[0].completed).to.be.true;
    });
  });
});
