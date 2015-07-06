var expect = require('expect');
var assert = require('assert');

var RangeSet = require('../RangeSet');

describe('RangeSet', () => {

  describe('#includes', () => {
    it('is false for empty set', () => {
      var set = new RangeSet();
      assert( !set.includes({"range": [0,2]}) );
    });
    it('is false for overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      assert( !set.includes({"range": [0,10]}) );
    });
    it('is false for overlapping two ranges', () => {
      var set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      assert( !set.includes({"range": [1,5]}) );
    });
    it('is true for exact range', () => {
      var set = new RangeSet([{"range": [2,4]}]);
      assert( set.includes({"range": [2,4]}) );
    });
    it('is true for containing range', () => {
      var set = new RangeSet([{"range": [0,10]}]);
      assert( set.includes({"range": [2,4]}) );
    });
    it('is false if contains but value doesnt match', () => {
      var set = new RangeSet([{"range": [2,4], "value": "foo"}]);
      assert( !set.includes({"range": [2,4], "value": "bar"}) );
    });
    it('is true if contains and value matches', () => {
      var set = new RangeSet([{"range": [2,4], "value": "foo"}]);
      assert( set.includes({"range": [2,4], "value": "foo"}) );
    });
  });

  describe('#overlaps', () => {
    it('is false when the ranges dont overlap', () => {
      var set = new RangeSet([{"range": [5,10]}]);

      assert( !set.overlaps({"range": [0,5]}) );
      assert( !set.overlaps({"range": [10,12]}) );
      assert( !set.overlaps({"range": [12,14]}) );
    });

    it('is true when the ranges overlap', () => {
      var set = new RangeSet([{"range": [6,10]}]);

      assert( set.overlaps({"range": [4,7]}) );
      assert( set.overlaps({"range": [8,12]}) );
    });

    it('is true when the range is included', () => {
      var set = new RangeSet([{"range": [0,10]}]);
      assert( set.overlaps({"range": [2,4]}) );
    });
  });

  describe('#add', () => {
    it('adds a range to an empty set', () => {
      var set = new RangeSet();
      var result = set.add({"range": [0,2]});

      expect(result).toEqual([{"range": [0,2]}]);
    });
    it('adds to a non-overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      var result = set.add({"range": [5,10]});

      expect(result).toEqual([{"range": [0,2]},{"range": [5,10]}]);
    });
    it('adds to an overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      var result = set.add({"range": [0,10]});

      expect(result).toEqual([{"range": [0,10]}]);
    });
    it('adds to two overlapping ranges', () => {
      var set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      var result = set.add({"range": [1,5]});

      expect(result).toEqual([{"range": [0,8]}]);
    });
    it('no-ops if exact range exists', () => {
      var set = new RangeSet([{"range": [2,4]}]);
      var result = set.add({"range": [2,4]});

      expect(result).toEqual([{"range": [2,4]}]);
    });
    it('no-ops if overlaops with range', () => {
      var set = new RangeSet([{"range": [0,10]}]);
      var result = set.add({"range": [2,4]});

      expect(result).toEqual([{"range": [0,10]}]);
    });
    it('adds ranges with values', () => {
      var set = new RangeSet([{"range": [0,2], "value": "foo"},
                              {"range": [4,8], "value": "bar"}]);
      var result = set.add({"range": [1,5], "value": "baz"});

      expect(result).toEqual([{"range": [0,1], "value": "foo"},
                              {"range": [1,5], "value": "baz"},
                              {"range": [5,8], "value": "bar"}]);
    });
  });

  describe('#remove', () => {
    it('no-ops for an empty set', () => {
      var set = new RangeSet();
      var result = set.remove({"range": [0,2]});

      expect(result).toEqual([]);
    });
    it('removes from an overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      var result = set.remove({"range": [0,10]});

      expect(result).toEqual([]);
    });

    // --------
    // xx  xxxx
    //  xxxx
    // x    xxx
    it('removes from two overlapping ranges', () => {
      var set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      var result = set.remove({"range": [1,5]});

      expect(result).toEqual([{"range": [0,1]},{"range": [5,8]}]);
    });

    // ------
    //   xx
    //   xx
    it('removes if exact range exists', () => {
      var set = new RangeSet([{"range": [2,4]}]);
      var result = set.remove({"range": [2,4]});

      expect(result).toEqual([]);
    });

    // ----------
    // xxxxxxxxxx
    //   xx
    // xx  xxxxxx
    it('removes if overlaops with range', () => {
      var set = new RangeSet([{"range": [0,10]}]);
      var result = set.remove({"range": [2,4]});

      expect(result).toEqual([{"range": [0,2]},{"range": [4,10]}]);
    });
  });
});
