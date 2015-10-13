import expect from 'expect';
import Guid from '../Guid';

describe('Guid', function() {

  describe('#unique', () => {

    it('generates a unique guid', function() {
      const id1 = Guid.unique();
      const id2 = Guid.unique();
      expect(id1).toNotBe(id2);
    });
  });

});
