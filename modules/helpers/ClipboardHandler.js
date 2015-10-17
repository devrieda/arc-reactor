import ClipboardParser from './ClipboardParser';
import History from './History';

const ClipboardHandler = {

  // create hidden div to capture the paste in IE
  beforePaste(selection) {
    this.position = selection.position();

    this.bin = document.createElement('div');
    this.bin.setAttribute('contenteditable', true);
    document.body.appendChild(this.bin);
    this.bin.focus();
  },

  paste(e, content, selection, callback) {
    if (e.clipboardData && e.clipboardData.types) {
      const pasted = this._handlePaste(e);
      e.preventDefault();
      e.stopPropagation();
      this._parseResult(pasted, content, selection.position(), callback);

    // Wait for the paste to happen (next loop?)
    } else if (this.bin) {
      setTimeout(() => {
        const pasted = this.bin.innerHTML;
        this.bin.parentNode.removeChild(this.bin);
        this._parseResult(pasted, content, this.position, callback);
      }, 1);
    }
  },

  _parseResult(pasted, content, position, callback) {
    const parser = new ClipboardParser(content, position);
    const results = parser.parse(pasted);

    // save history
    History.getInstance().push({
      content: results.content,
      position: results.position
    });

    // callback
    callback({
      content: results.content,
      position: results.position,
      emit: true
    });
  },

  _handlePaste(e) {
    let pasted;
    if (e.clipboardData.types.contains) {
      pasted = this._handleFirefoxPaste(e);
    } else {
      pasted = this._handleWebkitPaste(e);
    }
    return pasted;
  },

  _handleFirefoxPaste(e) {
    let data = "";
    if (e.clipboardData.types.contains('text/html')) {
      data = e.clipboardData.getData('text/html');
    } else {
      data = e.clipboardData.getData('text/plain');
    }
    return data;
  },

  _handleWebkitPaste(e) {
    let data = "";
    if (/text\/html/.test(e.clipboardData.types)) {
      data = e.clipboardData.getData('text/html');
    } else {
      data = e.clipboardData.getData('text/plain');
    }
    return data;
  }
} 

export default ClipboardHandler;
