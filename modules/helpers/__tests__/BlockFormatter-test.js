import expect from 'expect';
import { fromJS } from 'immutable';
import BlockFormatter from '../BlockFormatter';

describe('BlockFormatter', () => {
  describe('#applyMarkups', () => {

    it('returns text if no formatting applied', () => {
      const format = new BlockFormatter('a string of some text');

      const expected = 'a string of some text';
      const markups  = fromJS({});
      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with single strong tag', () => {
      const format = new BlockFormatter('a string of text');

      const expected = 'a <strong class="arc-Editor-Block__strong">string</strong> of text';
      const markups  = fromJS({"strong": [{"range": [2,8]}]});
      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with single em tag', () => {
      const format = new BlockFormatter('a string of text');

      const expected = 'a <em class="arc-Editor-Block__em">string</em> of text';
      const markups  = fromJS({"em": [{"range": [2,8]}]});
      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with single link tag', () => {
      const format = new BlockFormatter('a string of text');

      const expected = 'a <a class=\"arc-Editor-Block__a\" href=\"http://example.com\">string</a> of text';
      const markups  = fromJS({"a": [{"range": [2,8], "value": "http://example.com"}]});

      expect(format.applyMarkup(markups)).toBe(expected);
    });

    it('formats text with strong, em, and tag', () => {
      const format = new BlockFormatter('a string of text');

      const expected = 'a <a class="arc-Editor-Block__a" href="http://example.com">' +
                       '<strong class="arc-Editor-Block__strong">' +
                         '<em class="arc-Editor-Block__em">' +
                           'string' +
                         '</em>' +
                         '</strong>' +
                       '</a> of text';

      const markups  = fromJS({
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
      const markups = fromJS({
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [{
          "range": [0, 4]
        }, {
          "range": [10,15]
        }]
      });

      const expected = {
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [{
          "range": [0, 4]
        }, {
          "range": [10,15]
        }]
      };

      const format = new BlockFormatter("This is a bold link embedded");
      const result = format.denormalizeRanges(markups);

      expect(result.toJS()).toEqual(expected);
    });

    it("denormalizes two overlapping ranges", () => {
      const markups = fromJS({
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [{
          "range": [10,19]
        }]
      });

      const expected = {
        "a": [{
          "range": [15,19], "value": "http://derekdevries.com"
        }],
        "strong": [
          {"range": [15,19]},
          {"range": [10,15]}
        ]
      };

      const format = new BlockFormatter("This is a bold link embedded");
      const result = format.denormalizeRanges(markups);

      expect(result.toJS()).toEqual(expected);
    });

    it("denormalizes many overlapping ranges", () => {
      const markups = fromJS({
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

      const expected = {
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

      const format = new BlockFormatter("This is a bold link embedded");
      const result = format.denormalizeRanges(markups);

      expect(result.toJS()).toEqual(expected);
    });
  });
});
