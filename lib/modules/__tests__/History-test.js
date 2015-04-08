var expect = require('expect');

var History = require('../History');

describe('History', () => {
  var state1, state2, state3;

  beforeEach( () => {
    state1 = { a: 1 };
    state2 = { a: 2 };
    state3 = { a: 3 };
  });

  describe('#push', () => {
    it('adds history onto the stack', () => {
      var history = new History();
      history.push(state1)
      history.push(state2)

      expect(history.current()).toEqual(state2);
    });

    it('overwrites previous history if we did an undo', () => {
      var history = new History();
      history.push(state1)
      history.push(state2)
      history.undo(); // totally undo state2

      // state3 overwrites state 2
      history.push(state3);
      expect(history.current()).toEqual(state3);

      // if we undo again, 2 is gone. goes back to 1
      history.undo();
      expect(history.current()).toEqual(state1);
    });
  });

  describe('#undo', () => {
    it('returns the previous state', () => {
      var history = new History();
      history.push(state1)
      history.push(state2)
      history.undo();

      expect(history.current()).toEqual(state1);
    });
  });

  describe('#redo', () => {
    it('returns the next state', () => {
      var history = new History();
      history.push(state1)
      history.push(state2)
      history.undo();
      history.redo();

      expect(history.current()).toEqual(state2);
    });
  });
});
