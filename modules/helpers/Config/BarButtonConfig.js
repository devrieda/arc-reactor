import Config from './Config';

// default buttons
import ImageButton from '../../components/BarButtons/ImageButton';
import SectionButton from '../../components/BarButtons/SectionButton';

const defaults = [
  ImageButton,
  SectionButton,
];

const BarButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default BarButtonConfig;
