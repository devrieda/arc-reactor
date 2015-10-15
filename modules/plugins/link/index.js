import Button from "./LinkButton";
import './Link.scss';

const Plugin = {
  installMenuButtons(config) {
    config.use(Button);
  },
};

export default Plugin;
