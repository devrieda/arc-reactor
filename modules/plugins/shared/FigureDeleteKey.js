import DeleteFigure from './lib/DeleteFigure';

const KEY_CODES = { 'delete': 46 };

class FigureDeleteKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'figure-delete';
  }

  matches(event) {
    return event.keyCode === KEY_CODES.delete;
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();

    if (this.selection.isFigure() && !this.selection.isCaption()) {
      const command = new DeleteFigure(this.content);
      const results = command.execute(guids);
      callback({
        content: results.content,
        position: results.position,
        stopPropagation: !!results,
        preventDefault: !!results,
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

export default FigureDeleteKey;