ARC Reactor
===========
(A)nother (R)ich (C)ontent editor using React.js 

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
var ArcReactor = require('arc-reactor');
var { Editor, MenuToolbar } = ArcReactor;
var Store = require('./ContentStore.js');

var App = React.createClass({
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
