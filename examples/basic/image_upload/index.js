import Block from "./ImageUpload";
import Button from "./ImageUploadButton";
import './ImageUpload.scss';

const Plugin = {
  installBlocks(config) {
    config.use(Block);
  },

  installBarButton(config) {
    config.use(Button);
  },
};

export default Plugin;
