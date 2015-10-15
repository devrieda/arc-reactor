import Button from "./LinkButton";
import UnderlineKey from "./UnderlineKey";
import './Link.scss';

const Plugin = {
  installMenuButtons(config) {
    config.use(Button);
  },

  installKeys(config) {
    config.use(UnderlineKey);
  },
};

export default Plugin;
