var Guid = {
  guids: {},
  generate: function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },
  unique: function() {
    var id = this.generate();
    while (this.guids[id]) {
      id = this.generate();
    }
    this.add(id)
    return id;
  },
  add: function(id) {
    this.guids[id] = true;
  }
}
module.exports = Guid;
