import expect from 'expect';
import KeyConfig from '../Config/KeyConfig';
import KeyCommands from '../KeyCommands';

const specialStub = sinon.spy();
class SpecialKey {
  static getName() {
    return 'special';
  }

  matches() {
    return true;
  }

  down(callback) {
    specialStub();

    callback({
      content: {a: 1}, selection: "b", stopPropagation: true
    });
  }

  up(callback) {
    callback({ content: this.content });
  }
}

const magicStub = sinon.spy();
class MagicKey {
  static getName() {
    return 'magic';
  }

  matches() {
    return true;
  }

  down(callback) {
    magicStub();

    callback({
      content: {b: 2}, selection: "d", stopPropagation: true
    });
  }

  up(callback) {
    callback({ content: this.content });
  }
}

describe('KeyCommands', () => {
  beforeEach(function() {
    KeyConfig.reset();
  });

  describe('#execute', () => {
    it('should execute first command that matches', (done) => {
      KeyConfig.use(SpecialKey, { before: 'return' });
      KeyConfig.use(MagicKey,   { after:  'special' });

      KeyCommands.execute({type: 'down'}, {}, {}, function() {
        expect(specialStub.called).toBe(true);
        expect(magicStub.called).toBe(false);
        done();
      });
    });

    it('should return changed content and selection', (done) => {
      KeyConfig.use(SpecialKey, { before: 'return' });

      KeyCommands.execute({type: 'down'}, {}, {}, function(results) {
        expect(results.content).toEqual({a: 1});
        expect(results.selection).toEqual('b');
        done();
      });
    });
  });
});
