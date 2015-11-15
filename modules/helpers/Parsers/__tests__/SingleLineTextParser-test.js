import expect from 'expect';
import SingleLineTextParser from '../SingleLineTextParser';

describe('SingleLineTextParser', () => {
  describe('#parse', () => {
    it('parses single lines', function(done) {
      const callback = function(results) {
        expect(results[0].type).toEqual('p');
        expect(results[0].text).toEqual('pasted results');
        done();
      };

      const text = "pasted results";
      SingleLineTextParser.parse(text, callback);
    });
  });
});
