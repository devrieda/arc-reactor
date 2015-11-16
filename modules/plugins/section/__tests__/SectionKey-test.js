import SectionKey from '../SectionKey';

describe('SectionKey', () => {
  describe('#matches', () => {
    it('matches event for meta + return', () => {
      const event = { metaKey: true, keyCode: 13 };
      expect(SectionKey.matches(event)).to.be.true;
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 13 };
      expect(SectionKey.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
