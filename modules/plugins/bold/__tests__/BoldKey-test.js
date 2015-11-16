import BoldKey from '../BoldKey';

describe('BoldKey', () => {
  describe('#matches', () => {
    it('matches event for meta and b', () => {
      const event = { metaKey: true, keyCode: 66 };
      expect(BoldKey.matches(event)).to.be.true;
    });

    it('matches event for ctrl and b', () => {
      const event = { ctrlKey: true, keyCode: 66 };
      expect(BoldKey.matches(event)).to.be.true;
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 66 };
      expect(BoldKey.matches(event)).to.be.false;
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 66 };
      expect(BoldKey.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('sends message to manipulate content', () => {

    });
  });
});
