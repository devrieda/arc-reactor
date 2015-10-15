import Block from "./Tweet";
import Button from "./TweetButton";
import './Tweet.scss';

const Plugin = {
  installBlocks(config) {
    config.use(Block);
  },

  installMenuButton(config) {
    config.use(Button);
  },
};

export default Plugin;
