var expect = require('expect');
var { fromJS } = require('immutable');

var Commands = require('../Commands');

var specialStub = sinon.spy();
class SpecialKey {
  static getName() {
    return 'special-key';
  }

  matches() {
    return true;
  }

  execute() {
    specialStub();
    return {
      content: fromJS({a: 1}), selection: "b", stopPropogation: true
    };
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

  execute() {
    magicStub();
    return {
      content: fromJS({b: 2}), selection: "d", stopPropogation: true
    };
  }
}

describe('Commands', () => {
  describe('.constructor', () => {
    it('should install default commands', () => {
      var commands = new Commands();
      expect(commands.getCommands().length).toEqual(8);
    });
  });

  describe('.getInstance', () => {
    it('should get singleton instance of the commands', () => {
      var commands = Commands.getInstance();
      expect(commands.getCommands().length).toEqual(8);

      var commands2 = Commands.getInstance();
      expect(commands).toBe(commands2);
    });
  });

  describe('#use', () => {
    it('should add command to stack', () => {
      var commands = new Commands();
      commands.use(SpecialKey);

      var list = commands.getCommands();
      expect(list.length).toEqual(9);
      expect(list[8]).toBe(SpecialKey);
    });

    it('should insert command before another in stack', () => {
      var commands = new Commands();
      commands.use(SpecialKey, { before: 'return-key' });

      var list = commands.getCommands();
      expect(list.length).toEqual(9);

      expect(list[0]).toBe(SpecialKey);
    });

    it('should insert command after another in stack', () => {
      var commands = new Commands();
      commands.use(SpecialKey, { after: 'return-key' });

      var list = commands.getCommands();
      expect(list.length).toEqual(9);

      expect(list[1]).toBe(SpecialKey);
    });
  });

  describe('#execute', () => {
    it('should execute first command that matches', () => {
      var commands = new Commands();
      commands.use(SpecialKey, { before: 'return-key' });
      commands.use(MagicKey,   { after:  'special-key' });

      commands.execute({});

      expect(specialStub.called).toBe(true);
      expect(magicStub.called).toBe(false);
    });

    it('should return changed content and selection', () => {
      var commands = new Commands();
      commands.use(SpecialKey, { before: 'return-key' });

      var result = commands.execute({});
      expect(result.content).toEqual({a: 1});
      expect(result.selection).toEqual('b');
    });
  });
});
