## Medium style editor in reactjs


React Editor
===========
Rich content editor component. Super alpha and under heavy dev.

Usage
-----
```xml
<Editor content={object} onChange={fn}>
  <Toolbar.Basic />
</Editor>
```

Inside an app
-----
```js
var React = require('react');
var ReactEditor = require('react-editor');
var { Editor, MenuToolbar } = ReactEditor;
var Store = require('./ContentStore.js');

var App = React.createClass({
  getInitialState: function() {
    return { content: {} };
  },

  contentChanged: function(json) {
    Store.update(json);
  },

  render: function() {
    var content = Store.find();

    return (
      <Editor content={content} onChange={this.contentChanged}>
        <MenuToolbar.Basic />
      </Editor>
    );
  }
});

React.render(<App/>, document.getElementById("example"));
```

To run tests
-----

```bash
npm test
```

To view examples
-----

```bash
npm run examples
```
