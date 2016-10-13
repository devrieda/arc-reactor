import History from './History';
import InsertBlocks from './Manipulation/InsertBlocks';

import SingleLineTextParser from './Parsers/SingleLineTextParser';
import MultiLineTextParser from './Parsers/MultiLineTextParser';
import HtmlParser from './Parsers/HtmlParser';

const parsers = [
  SingleLineTextParser, MultiLineTextParser, HtmlParser
];

const ClipboardParser = {
  /**
   * Parse the pasted results and build new content with the pasted blocks
   * inserted.
   */
  parse(pasted, content, selection, callback) {

    this._parseBlocksWithStrategy(pasted, (blocks) => {
      // selection info
      const guids = selection.guids();
      const offsets = selection.offsets();

      // modify content
      const command = new InsertBlocks(content);
      const results = command.execute(guids, offsets, { blocks: blocks });

      // save history
      History.getInstance().push({
        content: results.content,
        position: results.position
      });

      // update key results
      callback({
        content: results.content,
        position: results.position,
        emit: true
      });
    });
  },


  /**
   * Determine which parser to use to parse the pasted text. We'll use
   * a different parser based on the contents of the text.
   * ie. are we parsing text, html, etc. This will execute the callback
   * function passing it the resulting array of blocks.
   */
  _parseBlocksWithStrategy(pasted, callback) {
    // find which parser to use
    const matching = parsers.filter(function(parser) {
      return parser.matches(pasted);
    });

    // first match parses
    matching.length && matching[0].parse(pasted, callback);
  }
}

export default ClipboardParser;
