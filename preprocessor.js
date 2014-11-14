var ReactTools = require('react-tools');

module.exports = {
  process: function(src, path) {
    if (path.match(/css$/)) { return ''; }
    return ReactTools.transform(src, {harmony: true});
  }
};
