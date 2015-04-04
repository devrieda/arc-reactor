var expect = require('expect');
var assert = require('assert');

var RangeSet = require('../RangeSet');

describe('RangeSet', () => {

  describe('#includes', () => {
    it('should be false for empty set', () => {
      var set = new RangeSet();
      assert( !set.includes({"range": [0,2]}) );
    });
    it('should be false for overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      assert( !set.includes({"range": [0,10]}) );
    });
    it('should be false for overlapping two ranges', () => {
      var set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      assert( !set.includes({"range": [1,5]}) );
    });
    it('should be true for exact range', () => {
      var set = new RangeSet([{"range": [2,4]}]);
      assert( set.includes({"range": [2,4]}) );
    });
    it('should be true for containing range', () => {
      var set = new RangeSet([{"range": [0,10]}]);
      assert( set.includes({"range": [2,4]}) );
    });
    it('should be false if contains but value doesnt match', () => {
      var set = new RangeSet([{"range": [2,4], "value": "foo"}]);
      assert( !set.includes({"range": [2,4], "value": "bar"}) );
    });
    it('should be true if contains and value matches', () => {
      var set = new RangeSet([{"range": [2,4], "value": "foo"}]);
      assert( set.includes({"range": [2,4], "value": "foo"}) );
    });
  });

  describe('#add', () => {
    it('should add a range to an empty set', () => {
      var set = new RangeSet();
      var result = set.add({"range": [0,2]});

      expect(result).toEqual([{"range": [0,2]}]);
    });
    it('should add to a non-overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      var result = set.add({"range": [5,10]});

      expect(result).toEqual([{"range": [0,2]},{"range": [5,10]}]);
    });
    it('should add to an overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      var result = set.add({"range": [0,10]});

      expect(result).toEqual([{"range": [0,10]}]);
    });
    it('should add to two overlapping ranges', () => {
      var set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      var result = set.add({"range": [1,5]});

      expect(result).toEqual([{"range": [0,8]}]);
    });
    it('should no-op if exact range exists', () => {
      var set = new RangeSet([{"range": [2,4]}]);
      var result = set.add({"range": [2,4]});

      expect(result).toEqual([{"range": [2,4]}]);
    });
    it('should no-op if overlaops with range', () => {
      var set = new RangeSet([{"range": [0,10]}]);
      var result = set.add({"range": [2,4]});

      expect(result).toEqual([{"range": [0,10]}]);
    });
    it('should add ranges with values', () => {
      var set = new RangeSet([{"range": [0,2], "value": "foo"},
                              {"range": [4,8], "value": "bar"}]);
      var result = set.add({"range": [1,5], "value": "baz"});

      expect(result).toEqual([{"range": [0,1], "value": "foo"},
                              {"range": [1,5], "value": "baz"},
                              {"range": [5,8], "value": "bar"}]);
    });
  });

  describe('#remove', () => {
    it('should no-op for an empty set', () => {
      var set = new RangeSet();
      var result = set.remove({"range": [0,2]});

      expect(result).toEqual([]);
    });
    it('should remove from an overlapping range', () => {
      var set = new RangeSet([{"range": [0,2]}]);
      var result = set.remove({"range": [0,10]});

      expect(result).toEqual([]);
    });

    // --------
    // xx  xxxx
    //  xxxx
    // x    xxx
    it('should remove from two overlapping ranges', () => {
      var set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      var result = set.remove({"range": [1,5]});

      expect(result).toEqual([{"range": [0,1]},{"range": [5,8]}]);
    });

    // ------
    //   xx
    //   xx
    it('should remove if exact range exists', () => {
      var set = new RangeSet([{"range": [2,4]}]);
      var result = set.remove({"range": [2,4]});

      expect(result).toEqual([]);
    });

    // ----------
    // xxxxxxxxxx
    //   xx
    // xx  xxxxxx
    it('should remove if overlaops with range', () => {
      var set = new RangeSet([{"range": [0,10]}]);
      var result = set.remove({"range": [2,4]});

      expect(result).toEqual([{"range": [0,2]},{"range": [4,10]}]);
    });
  });
});
