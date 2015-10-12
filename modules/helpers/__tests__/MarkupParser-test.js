const expect = require('expect');

const MarkupParser = require('../MarkupParser');

describe('MarkupParser', () => {
  function createNode(html) {
    const p = document.createElement('p');
    p.innerHTML = html;
    return p;
  }

  describe('#markups', () => {
    describe('with no tags', () => {
      it('should parse out text', () => {
        const html = 'a string of some text';
        const node = createNode(html);
        const parser = new MarkupParser(node);
        const results = parser.markups();
        expect(results).toEqual([]);
      });
    });

    describe('with single tags', () => {
      it('should parse out strong', () => {
        const html = 'a <strong class="arc-Editor-Block__strong">string</strong> of text';
        const node = createNode(html);
        const markups  = {"strong": [{"range": [2,8]}]};
        const parser = new MarkupParser(node);
        const results = parser.markups();
        expect(results).toEqual(markups);
      });

      it('should parse out em', () => {
        const html = 'a <em class="arc-Editor-Block__em">string</em> of text';
        const node = createNode(html);
        const markups  = {"em": [{"range": [2,8]}]};
        const parser = new MarkupParser(node);
        const results = parser.markups();
        expect(results).toEqual(markups);
      });

      it('should parse out link', () => {
        const html = 'a <a class=\"arc-Editor-Block__a\" href=\"http://example.com\">string</a> of text';
        const node = createNode(html);
        const markups  = {"a": [{"range": [2,8], "value": "http://example.com"}]};
        const parser = new MarkupParser(node);
        const results = parser.markups();
        expect(results).toEqual(markups);
      });
    });

    describe('with adjacent tags', () => {
      it('should parse out markup', () => {
        const html = 'a <em>string</em> of <em>some</em> text ';
        const node = createNode(html);
        const markups  = {"em": [{"range":[2,8]}, {"range":[12,16]}]};
        const parser = new MarkupParser(node);
        const results = parser.markups();
        expect(results).toEqual(markups);
      });
    });

    describe('with nested tags', () => {
      it('should parse out markup', () => {
        const html = 'a <a class="arc-Editor-Block__a" href="http://example.com">' +
                      '<strong class="arc-Editor-Block__strong">' +
                        '<em class="arc-Editor-Block__em">' +
                          'string' +
                        '</em>' +
                        '</strong>' +
                      '</a> of text';
        const node = createNode(html);
        const markups = {
          "strong": [
            {"range": [2,8]}
          ],
          "em": [
            {"range": [2,8]}
          ],
          "a": [
            {"range": [2,8], "value": "http://example.com"}
          ]
        };
        const parser = new MarkupParser(node);
        const results = parser.markups();
        expect(results).toEqual(markups);
      });
    });
  });
});
