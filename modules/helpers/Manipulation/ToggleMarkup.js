const Immutable = require('immutable');

const ContentFinder = require('../ContentFinder');
const RangeSet = require('../RangeSet');

class ToggleMarkup {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets, options) {
    const type  = options.type;
    const value = options.value;

    const range = this._finder().findRange(guids, offsets);
    const paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    if (paths.length === 1) {
      this._toggleSingleBlockMarkup(paths, offsets, type, value);
    } else {
      this._toggleMultiBlockMarkup(paths, offsets, type, value);
    }

    return { content: this.content, position: null };
  }

  /**
   * Just toggle markup on/off
   */
  _toggleSingleBlockMarkup(paths, offsets, type, value) {
    const hasMarkup = this._hasMarkup(paths[0], offsets, type, value);
    const remove = hasMarkup || value === '';
    this._toggleBlockMarkup(remove, paths[0], offsets, type, value);
  }

  /**
   * multi block requires 'all' text to be selected to remove. So if your
   * selection is partially bolded, it will add bold to the whole selection
   *
   * however if we have a value, we require 'any'. So if you have selected
   * text that is partially linked, it will remove links fro the selection
   */
  _toggleMultiBlockMarkup(paths, offsets, type, value) {
    // check if everything is selected
    const withMarkup = paths.filter( (path, i) => {
      const block = this.content.getIn(path);

      if (i === 0) {
        return this._hasMarkup(
          path, { anchor: offsets.anchor, focus: block.get('text').length }, type, value
        );
      } else if (i === paths.length - 1) {
        return this._hasMarkup(
          path, { anchor: 0, focus: offsets.focus }, type, value
        );
      } else {
        if (!block.get('text')) return true; // some items (ul) don't have text
        return this._hasMarkup(
          path, { anchor: 0, focus: block.get('text').length }, type, value
        );
      }
    });

    const remove = paths.length === withMarkup.length || value === '';

    // perform toggle
    paths.forEach( (path, i) => {
      const block = this.content.getIn(path);

      if (i === 0) {
        this._toggleBlockMarkup(
          remove, path, { anchor: offsets.anchor, focus: block.get('text').length }, type, value
        );
      } else if (i === paths.length - 1) {
        this._toggleBlockMarkup(
          remove, path, { anchor: 0, focus: offsets.focus }, type, value
        );
      } else {
        if (!block.get('text')) return; // some items (ul) don't have text
        this._toggleBlockMarkup(
          remove, path, { anchor: 0, focus: block.get('text').length }, type, value
        );
      }
    });
  }

  // check if the path has the given markup offsets range
  _hasMarkup(path, offsets, type, value) {
    const block = this.content.getIn(path);

    const markup = this._newMarkupRange(offsets, value);
    const set = this._getRangeSet(block, type);
    return set.includes(markup);
  }

  // add or remove markup for a block
  _toggleBlockMarkup(remove, path, offsets, type, value) {
    const block = this.content.getIn(path);
    let markups = this._getCurrentBlockMarkups(block, type);

    const markup = this._newMarkupRange(offsets, value);
    const set = this._getRangeSet(block, type);

    if (remove) {
      markups = markups.set(type, Immutable.fromJS(set.remove(markup)));
    } else {
      markups = markups.set(type, Immutable.fromJS(set.add(markup)));
    }

    this.content = this.content.setIn(path.concat('markups'), markups);
  }

  _newMarkupRange(offsets, value) {
    const markup = { 'range': [offsets.anchor, offsets.focus] };
    if (value) { markup.value = value; } // links need values
    return markup;
  }

  // for now "RangeSet" only works with js objects, so convert to get working
  _getRangeSet(block, type) {
    const markups = this._getCurrentBlockMarkups(block, type);
    return new RangeSet(markups.get(type).toJS());
  }

  // get the current markups for this block/markup-type
  _getCurrentBlockMarkups(block, type) {
    const { List, Map } = Immutable;

    const markups = block.get("markups", Map());
    return markups.set(type, markups.get(type, List()));
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default ToggleMarkup;
