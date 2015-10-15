import assign from "lodash.assign";

const Config = function(spec) {
  const config = assign({}, spec, {
    initialize() {
      this.items = this.getInitialItems ? this.getInitialItems() : [];
    },

    getItems() {
      return this.items;
    },

    reset() {
      this.initialize();
    },

    clear() {
      this.items = [];
    },

    /**
     * register a new item
     *
     * const config = new BlockConfig();
     * config.use(Code, { after: 'p' });
     */
    use(item, options) {
      // can't have the same one twice, so remove first
      this.remove(item.getName());

      const { before, after } = options || {};

      // insert the item in the stack
      if (before || after) {
        this._insertItem(item, before, after);

      // add to the end of the stack
      } else {
        this.items.push(item);
      }
    },

    /**
     * remove an item from the stack by name
     *
     * const config = new BlockConfig();
     * config.remove('code');
     */
    remove(name) {
      let newItems = [];
      this.items.forEach( (item) => {
        if (item.getName() !== name) {
          newItems.push(item);
        }
      });
      this.items = newItems;
    },

    _insertItem(newItem, before, after) {
      let newItems = [];
      this.items.forEach( (item) => {
        const name = item.getName();
        if (name === before) { newItems.push(newItem); }
        newItems.push(item);
        if (name === after) { newItems.push(newItem); }
      });
      this.items = newItems;
    }
  });

  config.initialize();
  return config;
};

export default Config;
