import Config from './Config';

// default keys
import ReturnKey from '../Keys/ReturnKey';
import DeleteKey from '../Keys/DeleteKey';
import BspaceKey from '../Keys/BspaceKey';
import DownKey from '../Keys/DownKey';
import UpKey from '../Keys/UpKey';
import UndoKey from '../Keys/UndoKey';
import RedoKey from '../Keys/RedoKey';
import OtherKey from '../Keys/OtherKey';

const defaults = [
  ReturnKey,
  DeleteKey,
  BspaceKey,
  DownKey,
  UpKey,
  UndoKey,
  RedoKey,
  OtherKey,
];

const KeyConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default KeyConfig;
