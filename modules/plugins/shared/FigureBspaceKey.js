import DeleteFigure from './lib/DeleteFigure';

const KEY_CODES = { 'bspace': 8 };

class FigureBspaceKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'figure-bspace';
  }

  // return or ctrl+m
  static matches(event) {
    return event.keyCode === KEY_CODES.bspace;
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

  _deleteFigure() {
    return new DeleteFigure(this.content);
  }
}

export default FigureBspaceKey;
