const Block = require("./Block");
const Key   = require("./Key");

const InlineCode = {
  getBlocks() {
    return [
      Block
    ];
  },

  getKeys() {
    return [
      Key
    ];
  },

  getBarButtons() {
    return [];
  },

  getMenuButtons() {
    return [];
  }
};

export default InlineCode;
