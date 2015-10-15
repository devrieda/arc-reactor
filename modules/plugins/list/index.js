import UnorderedList from './UnorderedList';
import OrderedList from './OrderedList';
import ListBspaceKey from './ListBspaceKey';
import './List.scss';

const Plugin = {
  installBlocks(config) {
    config.use(OrderedList);
    config.use(UnorderedList);
  },
  installKeys(config) {
    config.use(ListBspaceKey, { before: 'bspace' });
  },
};

export default Plugin;
