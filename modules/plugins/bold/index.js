import Key from "./BoldKey";
import Button from "./BoldButton";
import './Bold.scss';

const Plugin = {
  installKeys(config) {
    config.use(Key);
  },

  installMenuButtons(config) {
    config.use(Button);
  },
};

export default Plugin;
