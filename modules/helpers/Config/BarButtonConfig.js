import Config from './Config';

// default buttons
import SectionButton from '../../components/BarButtons/SectionButton';

const defaults = [
  SectionButton,
];

const BarButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default BarButtonConfig;
