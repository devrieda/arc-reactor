import RedoKey from '../RedoKey';

describe('RedoKey', () => {

  describe('#matches', () => {
    it('matches event for meta and y', () => {
      const event = { metaKey: true, keyCode: 89 };
      expect(RedoKey.matches(event)).to.be.true;
    });

    it('matches event for ctrl and y', () => {
      const event = { ctrlKey: true, keyCode: 89 };
      expect(RedoKey.matches(event)).to.be.true;
    });

    it('matches event for meta + shift + z', () => {
      const event = { metaKey: true, shiftKey: true, keyCode: 90 };
      expect(RedoKey.matches(event)).to.be.true;
    });

    it('matches event for ctrl + shift + z', () => {
      const event = { ctrlKey: true, shiftKey: true, keyCode: 90 };
      expect(RedoKey.matches(event)).to.be.true;
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 89 };
      expect(RedoKey.matches(event)).to.be.false;
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 89 };
      expect(RedoKey.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('pops onto the history stack', () => {
    });
  });
});
