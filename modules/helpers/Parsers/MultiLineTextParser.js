import Guid from '../Guid';

const MultiLineTextParser = {
  matches(text) {
    return text.toLowerCase().indexOf("<meta") === -1 &&
           text.indexOf("\n") !== -1;
  },

  parse(pasted, callback) {
    this._parseMultiLineText(pasted, callback);
  },

  _parseMultiLineText(pasted, callback) {
    this._parseTextLines(pasted.split("\n"), [], callback);
  },

  // TODO - how to hook parsers into individual plugins
  _parseTextLines(lines, blocks, callback) {
    const text = lines.shift();
    if (typeof text === "undefined") { return callback(blocks); }

    // list - add to blocks if previous has blocks yet
    if (text.match(/^[-*\d]\.?\s?/g)) {
      this._addListItem(text, lines, blocks, callback, this._parseTextLines.bind(this));

    // image
    } else if (text.match(/^http.+(gif|png|jpe?g)$/)) {
      this._addImage(text, lines, blocks, callback, this._parseTextLines.bind(this));

    // youtube
    } else if (text.match(/^http.+youtu.+$/)) {
      this._addYouTube(text, lines, blocks, callback, this._parseTextLines.bind(this));

    // text
    } else {
      this._addText(text, lines, blocks, callback, this._parseTextLines.bind(this));
    }
  },

  _addListItem(text, lines, blocks, finish, callback) {
    const cleanedText = text.replace(/^[-*\d]\.?\s?/g, '');

    // already started the list
    if (blocks.length > 0 && blocks[blocks.length-1].blocks) {
      blocks[blocks.length-1].blocks.push({
        id: Guid.unique(),
        type: 'li',
        text: cleanedText
      });

    // start new list
    } else {
      blocks.push({
        id: Guid.unique(),
        type: text.substring(0, 1) === '1' ? 'ol' : 'ul',
        blocks: [{
          id: Guid.unique(),
          type: 'li',
          text: cleanedText
        }]
      })
    }
    callback(lines, blocks, finish);
  },

  _addImage(text, lines, blocks, finish, callback) {
    const img = new Image();
    img.onload = () => {
      blocks.push({
        id: Guid.unique(),
        type: 'image',
        text: '',
        meta: { src: text, width: img.width, height: img.height }
      });
      callback(lines, blocks, finish);
    };
    img.src = text;
  },

  _addYouTube(text, lines, blocks, finish, callback) {
    const youTubeId = this._parseYouTube(text);
    if (youTubeId) {
      blocks.push({
        id: Guid.unique(),
        type: 'youtube',
        text: '',
        meta: { src: `https://www.youtube.com/embed/${youTubeId}` }
      });
    } else if (text.length) {
      blocks.push({
        id: Guid.unique(),
        type: 'p',
        text: text
      });
    }
    callback(lines, blocks, finish);
  },

  _parseYouTube(url) {
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    } else {
      return false;
    }
  },

  _addText(text, lines, blocks, finish, callback) {
    if (text.length) {
      blocks.push({
        id: Guid.unique(),
        type: 'p',
        text: text
      });
    }
    callback(lines, blocks, finish);
  },
};

export default MultiLineTextParser;
