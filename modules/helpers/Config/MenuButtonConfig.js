import Config from './Config';

// default buttons
import ItalicButton from '../../components/MenuButtons/ItalicButton';
import LinkButton from '../../components/MenuButtons/LinkButton';

const defaults = [
  ItalicButton,
  LinkButton,
];

const MenuButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default MenuButtonConfig;
