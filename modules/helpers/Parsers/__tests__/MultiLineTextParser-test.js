import expect from 'expect';
import MultiLineTextParser from '../MultiLineTextParser';
import Guid from '../../Guid';

describe('MultiLineTextParser', () => {
  beforeEach(function() {
    sinon.stub(Guid, 'unique', () => 'x');
  });

  afterEach(function() {
    sinon.restore(Guid, 'unique');
  });

  describe('#parse', () => {
    it('parses multi lines', function(done) {
      const callback = function(results) {
        const expected = [
          { id: 'x', type: 'p', text: "Conic Sections" },
          { id: 'x', type: 'p', text: "a curve formed by passing" },
          { id: 'x', type: 'p', text: "a plane through a right circular cone" },
        ];
        expect(results.length).toEqual(3);

        done();
      };

      const text = "Conic Sections\n" + 
                   "a curve formed by passing\n" + 
                   "a plane through a right circular cone";
      MultiLineTextParser.parse(text, callback);
    });
  });

  describe('with text that includes lists', function() {
    it('parses unordered lists with dash', function(done) {
      const callback = function(results) {
        const expected = [
          { id: 'x', type: 'p', text: "My List" },
          {
            id: 'x',
            type: 'ul',
            blocks: [
              { id: 'x', type: 'li', text: 'item 1' },
              { id: 'x', type: 'li', text: 'item 2' },
            ],
          },
          { id: 'x', type: 'p', text: "and more" }
        ];
        expect(results).toEqual(expected);
        done();
      };

      const text = "My List\n" + 
                   "- item 1\n" + 
                   "- item 2\n" + 
                   "and more";
      MultiLineTextParser.parse(text, callback);
    });

    it('parses unordered lists with star', function(done) {
      const callback = function(results) {
        const expected = [
          { id: 'x', type: 'p', text: "My List" },
          {
            id: 'x',
            type: 'ul',
            blocks: [
              { id: 'x', type: 'li', text: 'item 1' },
              { id: 'x', type: 'li', text: 'item 2' },
            ],
          },
          { id: 'x', type: 'p', text: "and more" }
        ];
        expect(results).toEqual(expected);
        done();
      };

      const text = "My List\n" + 
                   "* item 1\n" + 
                   "* item 2\n" + 
                   "and more";
      MultiLineTextParser.parse(text, callback);
    });

    it('parses ordered lists', function(done) {
      const callback = function(results) {
        const expected = [
          { id: 'x', type: 'p', text: "My List" },
          {
            id: 'x',
            type: 'ol',
            blocks: [
              { id: 'x', type: 'li', text: 'item 1' },
              { id: 'x', type: 'li', text: 'item 2' },
            ],
          },
          { id: 'x', type: 'p', text: "and more" }
        ];
        expect(results).toEqual(expected);
        done();
      };

      const text = "My List\n" + 
                   "1. item 1\n" + 
                   "2. item 2\n" + 
                   "and more";
      MultiLineTextParser.parse(text, callback);
    });
  });

  describe('with text that includes image urls', function() {
    it('parses image urls', function(done) {
      const callback = function(results) {
        const expected = [
          { id: 'x', type: 'p', text: "Camping" },
          { 
            id: 'x',
            type: 'image',
            text: '',
            meta: {
              src: 'http://tmp.derekdevries.com/stars.jpg',
              width: 800,
              height: 534
            }
          }
        ];
        expect(results).toEqual(expected);
        done();
      };

      const text = "Camping\n" + 
                   "http://tmp.derekdevries.com/stars.jpg"
      MultiLineTextParser.parse(text, callback);
    });
  })

  describe('with text that includes youtube urls', function() {
    it('parses youtube urls', function(done) {
      const callback = function(results) {
        const expected = [
          { id: 'x', type: 'p', text: "Camping" },
          {
            id: 'x',
            type: 'youtube',
            text: '',
            meta: {
              src: 'https://www.youtube.com/embed/zPEnKH8D73c',
            }
          }
        ];
        expect(results).toEqual(expected);
        done();
      };

      const text = "Camping\n" + 
                   "https://www.youtube.com/watch?v=zPEnKH8D73c"
      MultiLineTextParser.parse(text, callback);
    });
  });
});
