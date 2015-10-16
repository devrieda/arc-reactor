import SectionKey from '../SectionKey';

describe('SectionKey', () => {
  describe('#matches', () => {
    it('matches event for meta + return', () => {
      const event = { metaKey: true, keyCode: 13 };
      assert(SectionKey.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 13 };
      assert(!SectionKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
