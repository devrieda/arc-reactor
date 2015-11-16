import H3Key from '../H3Key';

describe('H3Key', () => {
  describe('#matches', () => {
    it('matches event for meta, alt, + 3', () => {
      const event = { metaKey: true, altKey: true, keyCode: 51 };
      expect(H3Key.matches(event)).to.be.true;
    });

    it('matches event for ctrl, alt, + 3', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 51 };
      expect(H3Key.matches(event)).to.be.true;
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 51 };
      expect(H3Key.matches(event)).to.be.false;
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 51 };
      expect(H3Key.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
