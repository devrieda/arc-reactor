class RangeSet {
  /**
   * Create a range set with an array of ranges such as:
   *  [{range: [0,2]}, {range: [5,8]}]
   */
  constructor(set) {
    this.set = set || [];
  }

  getSet() {
    return this.set;
  }

  /**
   * Check if the given range is included in the set
   */
  includes(range) {
    for (let i = 0, j = this.set.length; i < j; i++) {
      const setRange = this.set[i];
      if (range.value !== setRange.value) { continue; }
      if (setRange.range[0] <= range.range[0] &&
          setRange.range[1] >= range.range[1]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if the given range overlaps anything in the set
   */
  overlaps(range) {
    for (let i = 0, j = this.set.length; i < j; i++) {
      const setRange = this.set[i];
      if (setRange.range[1] > range.range[0] &&
          setRange.range[0] < range.range[1]) {
        return true;
      }
    }
    return false;
  }

  /**
   * return range of items that intersect in the sets
   */
  intersect(range) {
    if (this.set.length === 0) { return []; }

    let intersects = [];
    this.set.forEach( (setRange) => {
      let intersect = [];
      const list = this._setToArray([setRange]);
      for (let i = range.range[0]; i < range.range[1]; i++) {
        if (list[i]) {
          intersect[i] = range.value || true;
        }
      }
      const set = this._arrayToSet(intersect)[0];
      if (set) { intersects.push(set); }
    });

    return intersects;
  }

  /**
   * Add range to a set
   *
   * const set = new RangeSet({range: 0,20});
   * set.add({range: [0,2]});
   *
   * => [{range: [0,20]}]
   *
   */
  add(range) {
    if (this.set.length === 0) {
      this.set.push(range);
      return this.set;
    }
    let list = this._setToArray(this.set);
    for (let i = range.range[0]; i < range.range[1]; i++) {
      list[i] = range.value || true;
    }
    this.set = this._arrayToSet(list);
    return this.set;
  }

  /**
   * Remove range from a set
   *
   * const set = new RangeSet({range: 0,20});
   * set.remove({range: [0,2]});
   *
   * => [{range: 2,20}]
   */
  remove(range) {
    if (this.set.length === 0) { return this.set; }

    let list = this._setToArray(this.set);
    for (let i = range.range[0]; i < range.range[1]; i++) {
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
    let list = [];
    set.forEach( (setRange) => {
      const range = setRange.range;
      const value = setRange.value || true;
      for (let i = range[0]; i < range[1]; i++) { list[i] = value; }
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
    let set = [];
    let range = null;

    for (let i = 0, j = list.length; i < j; i++) {
      const value = list[i];

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

export default RangeSet;
