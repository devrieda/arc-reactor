import Config from './Config';

// default buttons
import LinkButton from '../../components/MenuButtons/LinkButton';

const defaults = [
  LinkButton,
];

const MenuButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default MenuButtonConfig;
