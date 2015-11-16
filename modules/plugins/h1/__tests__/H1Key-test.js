import H1Key from '../H1Key';

describe('H1Key', () => {
  describe('#matches', () => {
    it('matches event for meta, alt, + 1', () => {
      const event = { metaKey: true, altKey: true, keyCode: 49 };
      expect(H1Key.matches(event)).to.be.true;
    });

    it('matches event for ctrl, alt, + 1', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 49 };
      expect(H1Key.matches(event)).to.be.true;
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 49 };
      expect(H1Key.matches(event)).to.be.false;
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 49 };
      expect(H1Key.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
