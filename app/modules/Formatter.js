var Formatter = function(text) {
  this.text = text;
}
Formatter.prototype.applyMarkup = function(markups) {
  // return text;
  // var markups = inlines.filter(function(inline) {
  //   return inline.type == type; 
  // });
  // if (markups.length == 0) { return text; }

  return this.text;
}

Formatter.prototype.applyTag = function(tag) {

}


module.exports = Formatter;
