var expect = require('expect');
var assert = require('assert');

var BlockFormatter = require('../BlockFormatter');

describe('BlockFormatter', () => {
  describe('#applyMarkups', () => {

    it('returns text if no formatting applied', () => {
      var format = new BlockFormatter('a string of some text');

      var expected = 'a string of some text';
      var markups  = {};
      expect(format.applyMarkup(markups)).toBe(expected);
    })

    it('formats text with single strong tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <strong class="ic-Editor-Block__strong">string</strong> of text';
      var markups  = {"strong": [{"range": [2,8]}]};
      expect(format.applyMarkup(markups)).toBe(expected);
    })

    it('formats text with single em tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <em class="ic-Editor-Block__em">string</em> of text';
      var markups  = {"em": [{"range": [2,8]}]};
      expect(format.applyMarkup(markups)).toBe(expected);
    })

    it('formats text with single link tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <a class=\"ic-Editor-Block__a\" href=\"http://example.com\">string</a> of text';
      var markups  = {"a": [{"range": [2,8], "value": "http://example.com"}]};

      expect(format.applyMarkup(markups)).toBe(expected);
    })

    it('formats text with strong, em, and tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <a class="ic-Editor-Block__a" href="http://example.com">' + 
                       '<strong class="ic-Editor-Block__strong">' + 
                         '<em class="ic-Editor-Block__em">' + 
                           'string' + 
                         '</em>' + 
                         '</strong>' + 
                       '</a> of text'

      var markups  = {"strong": [
                        {"range": [2,8]}
                      ],
                      "em": [
                        {"range": [2,8]}
                      ],
                      "a": [
                        {"range": [2,8], "value": "http://example.com"}
                      ]};
      expect(format.applyMarkup(markups)).toBe(expected);
    })
  })
})
