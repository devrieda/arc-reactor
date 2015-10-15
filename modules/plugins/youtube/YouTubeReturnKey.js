import InsertYouTube from './lib/InsertYouTube';

const KEY_CODES = { 'return': 13, 'm': 77 };

class YouTubeReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'youtube-return';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.return ||
      (event.keyCode === KEY_CODES.m && event.ctrlKey);
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();

    const node = document.getElementsByName(guids.anchor)[0];
    const text = node && node.textContent;

    if (!this.selection.isRange() && text.match(/^http.+youtu.+$/)) {
      const command = new InsertYouTube(this.content)
      const results = command.execute(guids, offsets, { src: text });
      callback({
        content: results.content,
        position: results.position,
        stopPropagation: true,
        preventDefault: true,
        emit: true
      });
    } else {
      callback({ content: this.content });
    }
  }

  up(callback) {
    callback({ content: this.content });
  }
}

export default YouTubeReturnKey;
