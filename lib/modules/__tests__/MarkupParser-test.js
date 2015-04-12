var expect = require('expect');

var MarkupParser = require('../MarkupParser');

describe('MarkupParser', () => {
  function createNode(html) {
    var p = document.createElement('p');
    p.innerHTML = html;
    return p;
  }

  describe('#markups', () => {
    describe('with no tags', () => {
      it('should parse out text', () => {
        var html = 'a string of some text';
        var node = createNode(html);
        var parser = new MarkupParser(node);
        var results = parser.markups();
        expect(results).toEqual([]);
      });
    });

    describe('with single tags', () => {
      it('should parse out strong', () => {
        var html = 'a <strong class="ic-Editor-Block__strong">string</strong> of text';
        var node = createNode(html);
        var markups  = {"strong": [{"range": [2,8]}]};
        var parser = new MarkupParser(node);
        var results = parser.markups();
        expect(results).toEqual(markups);
      });

      it('should parse out em', () => {
        var html = 'a <em class="ic-Editor-Block__em">string</em> of text';
        var node = createNode(html);
        var markups  = {"em": [{"range": [2,8]}]};
        var parser = new MarkupParser(node);
        var results = parser.markups();
        expect(results).toEqual(markups);
      });

      it('should parse out link', () => {
        var html = 'a <a class=\"ic-Editor-Block__a\" href=\"http://example.com\">string</a> of text';
        var node = createNode(html);
        var markups  = {"a": [{"range": [2,8], "value": "http://example.com"}]};
        var parser = new MarkupParser(node);
        var results = parser.markups();
        expect(results).toEqual(markups);
      });
    });

    describe('with adjacent tags', () => {
      it('should parse out markup', () => {
        var html = 'a <em>string</em> of <em>some</em> text ';
        var node = createNode(html);
        var markups  = {"em": [{"range":[2,8]}, {"range":[12,16]}]};
        var parser = new MarkupParser(node);
        var results = parser.markups();
        expect(results).toEqual(markups);
      });
    });

    describe('with nested tags', () => {
      it('should parse out markup', () => {
        var html = 'a <a class="ic-Editor-Block__a" href="http://example.com">' +
                      '<strong class="ic-Editor-Block__strong">' +
                        '<em class="ic-Editor-Block__em">' +
                          'string' +
                        '</em>' +
                        '</strong>' +
                      '</a> of text';
        var node = createNode(html);
        var markups  = {"strong": [
                         {"range": [2,8]}
                       ],
                       "em": [
                         {"range": [2,8]}
                       ],
                       "a": [
                         {"range": [2,8], "value": "http://example.com"}
                       ]};
        var parser = new MarkupParser(node);
        var results = parser.markups();
        expect(results).toEqual(markups);
      });
    });
  });
});
