import Block from "./Code";
import Key   from "./Key";

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
