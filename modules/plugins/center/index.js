import Key from "./CenterKey";
import Button from "./CenterButton";
import './Center.scss';

const Plugin = {
  installKeys(config) {
    config.use(Key);
  },

  installMenuButtons(config) {
    config.use(Button);
  },
};

export default Plugin;
