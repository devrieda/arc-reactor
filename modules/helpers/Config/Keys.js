import ReturnKey from '../Keys/ReturnKey';
import DeleteKey from '../Keys/DeleteKey';
import BspaceKey from '../Keys/BspaceKey';
import DownKey from '../Keys/DownKey';
import UpKey from '../Keys/UpKey';
import BoldKey from '../Keys/BoldKey';
import ItalicKey from '../Keys/ItalicKey';
import CenterKey from '../Keys/CenterKey';
import H1Key from '../Keys/H1Key';
import H2Key from '../Keys/H2Key';
import H3Key from '../Keys/H3Key';
import QuoteKey from '../Keys/QuoteKey';
import CodeKey from '../Keys/CodeKey';
import UndoKey from '../Keys/UndoKey';
import RedoKey from '../Keys/RedoKey';
import OtherKey from '../Keys/OtherKey';

const Keys = {
  getItems() {
    return [
      ReturnKey,
      DeleteKey,
      BspaceKey,
      DownKey,
      UpKey,
      BoldKey,
      ItalicKey,
      CenterKey,
      H1Key,
      H2Key,
      H3Key,
      QuoteKey,
      CodeKey,
      UndoKey,
      RedoKey,
      OtherKey,
    ];
  }
};

export default Keys;
