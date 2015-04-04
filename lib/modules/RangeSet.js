class MarkupSet {
  constructor(set) {
    this.set = set || [];
  }

  includes(range) {
    for (var i = 0, j = this.set.length; i < j; i++) {
      var setRange = this.set[i];
      if (range.value !== setRange.value) { continue; }
      if (setRange.range[0] <= range.range[0] &&
          setRange.range[1] >= range.range[1]) {
        return true;
      }
    }
    return false;
  }

  add(range) {
    if (this.set.length === 0) {
      this.set.push(range);
      return this.set;
    }
    var list = this._setToArray(this.set);
    for (var i = range.range[0]; i < range.range[1]; i++) {
      list[i] = range.value || true;
    }
    this.set = this._arrayToSet(list);
    return this.set;
  }

  remove(range) {
    if (this.set.length === 0) { return this.set; }

    var list = this._setToArray(this.set);
    for (var i = range.range[0]; i < range.range[1]; i++) {
      list[i] = undefined;
    }
    this.set = this._arrayToSet(list);
    return this.set;
  }

  // convert our set to an array of values.
  //
  // [{"range": [0,1]}, {"range": [4,5]}]
  //
  // becomes:
  // [true, false, false, false, true]
  //
  _setToArray(set) {
    var list = [];
    set.forEach( (setRange) => {
      var range = setRange.range;
      var value = setRange.value || true;
      for (var i = range[0]; i < range[1]; i++) { list[i] = value; }
    });
    return list;
  }

  // convert array back to set of ranges
  //
  // [true, false, false, false, true]
  //
  // becomes:
  // [{"range": [0,1]}, {"range": [4,5]}]
  //
  _arrayToSet(list) {
    var set = [];

    var range = null;
    for (var i = 0, j = list.length; i < j; i++) {
      var value = list[i];

      // start new range
      if (value && !range) {
        range = { "range": [i,i+1], "value": value };

      // update end of range
      } else if (range && value && range.value === value) {
        range.range[1] = i+1;

      // finish up range
      } else if (range && range.value !== value) {
        set.push(range);
        range = value ? { "range": [i,i+1], "value": value } : null;
      }
    }
    if (range) { set.push(range); }

    return set.map( (range) => {
      if (range.value === true) { delete range.value; }
      return range;
    });
  }
}

module.exports = MarkupSet;
