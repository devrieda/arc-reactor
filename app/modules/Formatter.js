function escape(string) {
  var entityMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': '&quot;' };
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

var Formatter = function(text) {
  this.text = text;
}
Formatter.prototype.applyMarkup = function(markups) {
  if (markups.length == 0) { return; }

  this.applyAction('a', markups);
  this.applyAction('strong', markups);
  this.applyAction('em', markups);

  return this.text;
}

Formatter.prototype.applyAction = function(action, markups) {
  var markups = markups.forEach(function(markup) {
    if (markup.action != action) { return; }

    var text = this.text.slice(markup.offsetStart, markup.offsetEnd);
    console.log(text)

  }.bind(this));
}

module.exports = Formatter;
