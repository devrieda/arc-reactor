const Guid = {
  guids: {},
  generate() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },
  unique() {
    let id = this.generate();
    while (this.guids[id]) {
      id = this.generate();
    }
    this.add(id);
    return id;
  },
  add(id) {
    this.guids[id] = true;
  }
};
module.exports = Guid;
