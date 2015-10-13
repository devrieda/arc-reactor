import BspaceKey from '../BspaceKey';

describe('BspaceKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for bspace key', () => {
      const event = { keyCode: 8 };
      const key = new BspaceKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if not bspace", () => {
      const event = {};
      const key = new BspaceKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
