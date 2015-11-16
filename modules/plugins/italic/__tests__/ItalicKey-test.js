import ItalicKey from '../ItalicKey';

describe('ItalicKey', () => {
  describe('#matches', () => {
    it('matches event for meta and e', () => {
      const event = { metaKey: true, keyCode: 73 };
      expect(ItalicKey.matches(event)).to.be.true;
    });

    it('matches event for ctrl and b', () => {
      const event = { ctrlKey: true, keyCode: 73 };
      expect(ItalicKey.matches(event)).to.be.true;
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 73 };
      expect(ItalicKey.matches(event)).to.be.false;
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 73 };
      expect(ItalicKey.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
