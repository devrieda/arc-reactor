import Key from "./ItalicKey";
import Button from "./ItalicButton";
import './Italic.scss';

const Plugin = {
  installKeys(config) {
    config.use(Key);
  },

  installMenuButtons(config) {
    config.use(Button);
  },
};

export default Plugin;
