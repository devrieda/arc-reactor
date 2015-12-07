import HtmlParser from '../HtmlParser';

describe('HtmlParser', () => {

  describe.skip('with html', function() {
    it('parses blocks', function(done) {
      const callback = function(results) {
        const expected = [
          { type: 'h2', text: 'History of Photography' },
          { type: 'p', text: '' },
          {
            type: 'p',
            text: 'Photography is a word derived from the Greek words photos.', 
            markups: {
              'strong': [],
              'em': [],
              'a': [],
            } 
          },
          { type: 'h3', text: 'This is the subhead' },
          { type: 'ul', text: '', blocks: [
            { type: 'li', text: 'this is item 1' },
            { type: 'li', text: 'this is item 2' },
          ]}
        ];
        expect(results).to.eql(expected);
        done();
      };

      const html = '<meta charset=\'utf-8\'><h2>History of Photography</h2><p><br></p><p>Photography is a word<span class="Apple-converted-space"> </span><strong>derived</strong><span class="Apple-converted-space"> </span>from the<span class="Apple-converted-space"> </span><a href="http://google.com/"><strong><em>Greek</em></strong></a><span class="Apple-converted-space"> </span>words photos</p><h3>This is the subhead</h3><ul><li>this is item 1</li><li>this is item 2</li></ul>';
      HtmlParser.parse(html, callback);
    });

    it('parses markup', function(done) {
      const callback = function(results) {
        expect(results).to.eql({});
        done();
      };
      const html = "";
      HtmlParser.parse(html, callback);
    });

    it('parses nested blocks', function(done) {
      const callback = function(results) {
        expect(results).to.eql({});
        done();
      };
      const html = "";
      HtmlParser.parse(html, callback);
    });

    it('parses nested markup', function(done) {
      const callback = function(results) {
        expect(results).to.eql({});
        done();
      };
      const html = "";
      HtmlParser.parse(html, callback);
    });
  });
});
