const INTERNAL_CLASS = 'arc-Editor';

class ClipboardParser {
  constructor(content, position) {
    this.content = content;
    this.position = position;
  }

  parse(pasted) {
    let results;
    if (pasted.indexOf("<meta charset") !== -1) {
      results = this._parseHtml(pasted);

    } else if (pasted.indexOf("\n") !== -1) {
      results = this._parseMultiLineText(pasted);

    } else {
      results = this._parseSingleLineText(pasted);
    }

    return {
      content: results.content,
      position: results.position,
    }
  }

  // text
  _parseMultiLineText(pasted) {
    const blocks = pasted.split("\n").map((text) => {
      return { type: "p", text: text };
    });
    return this._buildBlocks(blocks);
  }
  _parseSingleLineText(pasted) {
    return this._buildBlocks([{ type: "p", text: pasted }]);
  }

  // html
  _parseHtml(pasted) {
    const dom = document.createElement('div');
    dom.innerHTML = pasted;

    // if this is an internal paste, we won't hoist headers
    if (pasted.indexOf(INTERNAL_CLASS) === -1) {
      // TODO - hoist headers so that things look nice
    }
    return this._buildBlocks([]);
  }


  _buildBlocks(attrs) {
    // TODO - build actual immutable block maps

    return {
      content: this.content,
      position: this.position,
    };
  }
};

export default ClipboardParser;
