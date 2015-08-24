var expect = require('expect');

var { fromJS } = require('immutable');

var BlockFormatter = require('../BlockFormatter');

describe('BlockFormatter', () => {
  describe('#applyMarkups', () => {

    it('returns text if no formatting applied', () => {
      var format = new BlockFormatter('a string of some text');

      var expected = 'a string of some text';
      var markups  = fromJS({});
      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with single strong tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <strong class="arc-Editor-Block__strong">string</strong> of text';
      var markups  = fromJS({"strong": [{"range": [2,8]}]});
      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with single em tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <em class="arc-Editor-Block__em">string</em> of text';
      var markups  = fromJS({"em": [{"range": [2,8]}]});
      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with single link tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <a class=\"arc-Editor-Block__a\" href=\"http://example.com\">string</a> of text';
      var markups  = fromJS({"a": [{"range": [2,8], "value": "http://example.com"}]});

      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with strong, em, and tag', () => {
      var format = new BlockFormatter('a string of text');

      var expected = 'a <a class="arc-Editor-Block__a" href="http://example.com">' +
                       '<strong class="arc-Editor-Block__strong">' +
                         '<em class="arc-Editor-Block__em">' +
                           'string' +
                         '</em>' +
                         '</strong>' +
                       '</a> of text';

      var markups  = fromJS({
        "strong": [
          {"range": [2,8]}
        ],
        "em": [
          {"range": [2,8]}
        ],
        "a": [
          {"range": [2,8], "value": "http://example.com"}
        ]
      });
      expect(format.applyMarkup(markups)).toBe(expected);
    });
  });

  describe('#denormalizemarkupRanges', () => {
    it("leaves non-overlapping ranges", () => {
      var markups = fromJS({
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [{
          "range": [0, 4]
        }, {
          "range": [10,15]
        }]
      });

      var expected = {
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [{
          "range": [0, 4]
        }, {
          "range": [10,15]
        }]
      };

      var format = new BlockFormatter("This is a bold link embedded");
      var result = format.denormalizeRanges(markups);

      expect(result.toJS()).toEqual(expected);
    });

    it("denormalizes two overlapping ranges", () => {
      var markups = fromJS({
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [{
          "range": [10,19]
        }]
      });

      var expected = {
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [
          {"range": [15,19]},
          {"range": [10,15]}
        ]
      };

      var format = new BlockFormatter("This is a bold link embedded");
      var result = format.denormalizeRanges(markups);

      expect(result.toJS()).toEqual(expected);
    });

    it("denormalizes many overlapping ranges", () => {
      var markups = fromJS({
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [{
          "range": [10,19]
        }],
        "em": [{
          "range": [1,20]
        }]
      });

      var expected = {
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [
          {"range": [15,19]},
          {"range": [10,15]}
        ],
        "em": [
          {"range":[10,15]},
          {"range":[15,19]},
          {"range":[1,10]},
          {"range":[19,20]}
        ]
      };

      var format = new BlockFormatter("This is a bold link embedded");
      var result = format.denormalizeRanges(markups);

      expect(result.toJS()).toEqual(expected);
    });
  });
});
