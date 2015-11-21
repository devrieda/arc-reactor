import SingleLineTextParser from '../SingleLineTextParser';
import Guid from '../../Guid';

describe('SingleLineTextParser', () => {
  beforeEach(function() {
    sinon.stub(Guid, 'unique', () => 'x');
  });

  afterEach(function() {
    sinon.restore(Guid, 'unique');
  });

  describe('#parse', () => {
    it('parses single lines', function(done) {
      const callback = function(results) {
        const expected = [{
          id: 'x', type: 'p', text: 'pasted results'
        }];
        expect(results).to.eql(expected);
        done();
      };

      const text = "pasted results";
      SingleLineTextParser.parse(text, callback);
    });
  });
});
