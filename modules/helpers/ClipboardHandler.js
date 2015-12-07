const ClipboardHandler = {

  // create hidden div to capture the paste in IE
  beforePaste() {
    this.div = document.createElement('div');
    this.div.className = "pasted-content";
    this.div.setAttribute('contenteditable', true);
    document.body.appendChild(this.div);
    this.div.focus();
  },

  paste(e, callback) {
    // firefox / webkit
    if (e.clipboardData && e.clipboardData.types) {
      const pasted = this._handlePaste(e);
      e.preventDefault();
      e.stopPropagation();
      callback(pasted);

    // ie: Wait for the paste to happen (next loop?)
    } else if (this.div) {
      setTimeout(() => {
        const pasted = this.div.innerHTML;
        this.div.parentNode.removeChild(this.div);
        callback(pasted);
      }, 1);
    }
  },

  getDiv() {
    return this.div;
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
