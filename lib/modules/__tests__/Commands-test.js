var expect = require('expect');

var Commands = require('../Commands');

var specialStub = sinon.spy();
class SpecialKey {
  static getName() {
    return 'special-key';
  }

  matches() {
    return true;
  }

  execute(callback) {
    specialStub();

    callback({
      content: {a: 1}, selection: "b", stopPropagation: true
    });
  }
}

var magicStub = sinon.spy();
class MagicKey {
  static getName() {
    return 'magic-key';
  }

  matches() {
    return true;
  }

  execute(callback) {
    magicStub();

    callback({
      content: {b: 2}, selection: "d", stopPropagation: true
    });
  }
}

describe('Commands', () => {
  describe('.constructor', () => {
    it('should install default commands', () => {
      var commands = new Commands();
      expect(commands.getCommands().length > 0).toBe(true);
    });
  });

  describe('.getInstance', () => {
    it('should get singleton instance of the commands', () => {
      var commands = Commands.getInstance();
      expect(commands.getCommands().length > 0).toBe(true);

      var commands2 = Commands.getInstance();
      expect(commands).toBe(commands2);
    });
  });

  describe('#use', () => {
    it('should add command to stack', () => {
      var commands = new Commands();
      var before = commands.getCommands().length;

      commands.use(SpecialKey);

      var list = commands.getCommands();

      expect(list.length - before).toEqual(1);
      expect(list[list.length - 1]).toBe(SpecialKey);
    });

    it('should insert command before another in stack', () => {
      var commands = new Commands();
      var before = commands.getCommands().length;

      commands.use(SpecialKey, { before: 'return-key' });

      var list = commands.getCommands();

      expect(list.length - before).toEqual(1);
      expect(list[0]).toBe(SpecialKey);
    });

    it('should insert command after another in stack', () => {
      var commands = new Commands();
      var before = commands.getCommands().length;

      commands.use(SpecialKey, { after: 'return-key' });

      var list = commands.getCommands();

      expect(list.length - before).toEqual(1);
      expect(list[1]).toBe(SpecialKey);
    });
  });

  describe('#execute', () => {
    it('should execute first command that matches', (done) => {
      var commands = new Commands();
      commands.use(SpecialKey, { before: 'return-key' });
      commands.use(MagicKey,   { after:  'special-key' });

      commands.execute({}, {}, {}, function() {
        expect(specialStub.called).toBe(true);
        expect(magicStub.called).toBe(false);
        done();
      });
    });

    it('should return changed content and selection', (done) => {
      var commands = new Commands();
      commands.use(SpecialKey, { before: 'return-key' });

      commands.execute({}, {}, {}, function(results) {
        expect(results.content).toEqual({a: 1});
        expect(results.selection).toEqual('b');
        done();
      });
    });
  });
});
