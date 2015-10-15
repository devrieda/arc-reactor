import Config from './Config';

// default buttons
import BoldButton from '../../components/MenuButtons/BoldButton';
import ItalicButton from '../../components/MenuButtons/ItalicButton';
import CenterButton from '../../components/MenuButtons/CenterButton';
import LinkButton from '../../components/MenuButtons/LinkButton';

const defaults = [
  BoldButton,
  ItalicButton,
  CenterButton,
  LinkButton,
];

const MenuButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default MenuButtonConfig;
