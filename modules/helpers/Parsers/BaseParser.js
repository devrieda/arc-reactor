import SingleLineTextParser from './SingleLineTextParser';
import MultiLineTextParser from './MultiLineTextParser';
import HtmlParser from './HtmlParser';

const parsers = [
  SingleLineTextParser, SingleLineTextParser, HtmlParser
];
const BaseParser = {
  parse(pasted, callback) {
    const matching = parsers.filter(function(parser) {
      return parser.matches(pasted);
    });

    // first match parses
    matching.length && matching[0].parse(pasted, callback);
  },
};

export default BaseParser;
