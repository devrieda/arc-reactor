var Formatter = function(node) {
  this.node = node;
}
Formatter.prototype.applyMarkup = function(markups) {
  if (markups.length == 0) { return; }

  this.applyAction('createLink', markups);
  this.applyAction('bold', markups);
  this.applyAction('italic', markups);
}

Formatter.prototype.applyAction = function(action, markups) {
  var textNode = this.node.childNodes[0];
  var markups = markups.forEach(function(markup) {
    if (markup.action != action) { return; }

    var range = document.createRange();
    range.setStart(textNode, markup.startOffset);
    range.setEnd(textNode, markup.endOffset);

    console.log(range)
    document.execCommand(markup.action, false, markup.value)
  }.bind(this));
}

module.exports = Formatter;
