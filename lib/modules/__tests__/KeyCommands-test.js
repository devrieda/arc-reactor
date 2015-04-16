var expect = require('expect');

var KeyCommands = require('../KeyCommands');
var BaseKey = require('../Keys/BaseKey');

var specialStub = sinon.spy();
class SpecialKey extends BaseKey {
  static getName() {
    return 'special-key';
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
}

var magicStub = sinon.spy();
class MagicKey extends BaseKey {
  static getName() {
    return 'magic-key';
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
}

describe('KeyCommands', () => {
  describe('.constructor', () => {
    it('should install default commands', () => {
      var keys = new KeyCommands();
      expect(keys.getKeys().length > 0).toBe(true);
    });
  });

  describe('.getInstance', () => {
    it('should get singleton instance of the commands', () => {
      var keys = KeyCommands.getInstance();
      expect(keys.getKeys().length > 0).toBe(true);

      var keys2 = KeyCommands.getInstance();
      expect(keys).toBe(keys2);
    });
  });

  describe('#use', () => {
    it('should add command to stack', () => {
      var keys = new KeyCommands();
      var before = keys.getKeys().length;

      keys.use(SpecialKey);

      var list = keys.getKeys();

      expect(list.length - before).toEqual(1);
      expect(list[list.length - 1]).toBe(SpecialKey);
    });

    it('should insert command before another in stack', () => {
      var keys = new KeyCommands();
      var before = keys.getKeys().length;

      keys.use(SpecialKey, { before: 'return-key' });

      var list = keys.getKeys();

      expect(list.length - before).toEqual(1);
      expect(list[0]).toBe(SpecialKey);
    });

    it('should insert command after another in stack', () => {
      var keys = new KeyCommands();
      var before = keys.getKeys().length;

      keys.use(SpecialKey, { after: 'return-key' });

      var list = keys.getKeys();

      expect(list.length - before).toEqual(1);
      expect(list[1]).toBe(SpecialKey);
    });
  });

  describe('#execute', () => {
    it('should execute first command that matches', (done) => {
      var keys = new KeyCommands();
      keys.use(SpecialKey, { before: 'return-key' });
      keys.use(MagicKey,   { after:  'special-key' });

      keys.execute({type: 'down'}, {}, {}, function() {
        expect(specialStub.called).toBe(true);
        expect(magicStub.called).toBe(false);
        done();
      });
    });

    it('should return changed content and selection', (done) => {
      var keys = new KeyCommands();
      keys.use(SpecialKey, { before: 'return-key' });

      keys.execute({type: 'down'}, {}, {}, function(results) {
        expect(results.content).toEqual({a: 1});
        expect(results.selection).toEqual('b');
        done();
      });
    });
  });
});
