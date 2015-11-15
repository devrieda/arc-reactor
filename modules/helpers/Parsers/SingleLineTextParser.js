import Guid from '../Guid';

const SingleLineTextParser = {
  matches(text) {
    return text.toLowerCase().indexOf("<meta") === -1 &&
           text.indexOf("\n") === -1;
  },

  parse(pasted, callback) {
    callback([
      { id: Guid.unique(), type: 'p', text: pasted }
    ]);
  }
};

export default SingleLineTextParser;
