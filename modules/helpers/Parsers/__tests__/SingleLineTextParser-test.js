import SingleLineTextParser from '../SingleLineTextParser';

describe('SingleLineTextParser', () => {
  describe('#parse', () => {
    it('parses single lines', function(done) {
      const callback = function(results) {
        expect(results[0].type).to.equal('p');
        expect(results[0].text).to.equal('pasted results');
        done();
      };

      const text = "pasted results";
      SingleLineTextParser.parse(text, callback);
    });
  });
});
