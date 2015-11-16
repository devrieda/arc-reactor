import History from '../History';

describe('History', () => {
  let state1, state2, state3;

  beforeEach( () => {
    state1 = { a: 1 };
    state2 = { a: 2 };
    state3 = { a: 3 };
  });

  describe('#push', () => {
    it('adds history onto the stack', () => {
      const history = new History();
      history.push(state1, true);
      history.push(state2, true);

      expect(history.current()).to.equal(state2);
    });

    it('overwrites previous history if we did an undo', () => {
      const history = new History();
      history.push(state1, true);
      history.push(state2, true);
      history.undo(); // totally undo state2

      // state3 overwrites state 2
      history.push(state3, true);
      expect(history.current()).to.equal(state3);

      // if we undo again, 2 is gone. goes back to 1
      history.undo();
      expect(history.current()).to.equal(state1);
    });
  });

  describe('#undo', () => {
    it('returns the previous state', () => {
      const history = new History();
      history.push(state1, true);
      history.push(state2, true);
      history.undo();

      expect(history.current()).to.equal(state1);
    });
  });

  describe('#redo', () => {
    it('returns the next state', () => {
      const history = new History();
      history.push(state1, true);
      history.push(state2, true);
      history.undo();
      history.redo();

      expect(history.current()).to.equal(state2);
    });
  });
});
