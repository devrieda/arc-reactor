import Config from './Config';

// default buttons
import BoldButton from '../../components/MenuButtons/BoldButton';
import ItalicButton from '../../components/MenuButtons/ItalicButton';
import H3Button from '../../components/MenuButtons/H3Button';
import CenterButton from '../../components/MenuButtons/CenterButton';
import LinkButton from '../../components/MenuButtons/LinkButton';

const defaults = [
  BoldButton,
  ItalicButton,
  H3Button,
  CenterButton,
  LinkButton,
];

const MenuButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default MenuButtonConfig;
