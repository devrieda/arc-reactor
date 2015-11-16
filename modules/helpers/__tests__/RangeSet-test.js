import RangeSet from '../RangeSet';

describe('RangeSet', () => {

  describe('#includes', () => {
    it('is false for empty set', () => {
      const set = new RangeSet();
      expect( set.includes({"range": [0,2]}) ).to.be.false;
    });
    it('is false for overlapping range', () => {
      const set = new RangeSet([{"range": [0,2]}]);
      expect( set.includes({"range": [0,10]}) ).to.be.false;
    });
    it('is false for overlapping two ranges', () => {
      const set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      expect( set.includes({"range": [1,5]}) ).to.be.false;
    });
    it('is true for exact range', () => {
      const set = new RangeSet([{"range": [2,4]}]);
      expect( set.includes({"range": [2,4]}) ).to.be.true;
    });
    it('is true for containing range', () => {
      const set = new RangeSet([{"range": [0,10]}]);
      expect( set.includes({"range": [2,4]}) ).to.be.true;
    });
    it('is false if contains but value doesnt match', () => {
      const set = new RangeSet([{"range": [2,4], "value": "foo"}]);
      expect( set.includes({"range": [2,4], "value": "bar"}) ).to.be.false;
    });
    it('is true if contains and value matches', () => {
      const set = new RangeSet([{"range": [2,4], "value": "foo"}]);
      expect( set.includes({"range": [2,4], "value": "foo"}) ).to.be.true;
    });
  });

  describe('#overlaps', () => {
    it('is false when the ranges dont overlap', () => {
      const set = new RangeSet([{"range": [5,10]}]);

      expect( set.overlaps({"range": [0,5]}) ).to.be.false;
      expect( set.overlaps({"range": [10,12]}) ).to.be.false;
      expect( set.overlaps({"range": [12,14]}) ).to.be.false;
    });

    it('is true when the ranges overlap', () => {
      const set = new RangeSet([{"range": [6,10]}]);

      expect( set.overlaps({"range": [4,7]}) ).to.be.true;
      expect( set.overlaps({"range": [8,12]}) ).to.be.true;
    });

    it('is true when the range is included', () => {
      const set = new RangeSet([{"range": [0,10]}]);
      expect( set.overlaps({"range": [2,4]}) ).to.be.true;
    });
  });

  describe('#add', () => {
    it('adds a range to an empty set', () => {
      const set = new RangeSet();
      const result = set.add({"range": [0,2]});

      expect(result).to.eql([{"range": [0,2]}]);
    });
    it('adds to a non-overlapping range', () => {
      const set = new RangeSet([{"range": [0,2]}]);
      const result = set.add({"range": [5,10]});

      expect(result).to.eql([{"range": [0,2]},{"range": [5,10]}]);
    });
    it('adds to an overlapping range', () => {
      const set = new RangeSet([{"range": [0,2]}]);
      const result = set.add({"range": [0,10]});

      expect(result).to.eql([{"range": [0,10]}]);
    });
    it('adds to two overlapping ranges', () => {
      const set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      const result = set.add({"range": [1,5]});

      expect(result).to.eql([{"range": [0,8]}]);
    });
    it('no-ops if exact range exists', () => {
      const set = new RangeSet([{"range": [2,4]}]);
      const result = set.add({"range": [2,4]});

      expect(result).to.eql([{"range": [2,4]}]);
    });
    it('no-ops if overlaops with range', () => {
      const set = new RangeSet([{"range": [0,10]}]);
      const result = set.add({"range": [2,4]});

      expect(result).to.eql([{"range": [0,10]}]);
    });
    it('adds ranges with values', () => {
      const set = new RangeSet([{"range": [0,2], "value": "foo"},
                              {"range": [4,8], "value": "bar"}]);
      const result = set.add({"range": [1,5], "value": "baz"});

      expect(result).to.eql([{"range": [0,1], "value": "foo"},
                              {"range": [1,5], "value": "baz"},
                              {"range": [5,8], "value": "bar"}]);
    });
  });

  describe('#remove', () => {
    it('no-ops for an empty set', () => {
      const set = new RangeSet();
      const result = set.remove({"range": [0,2]});

      expect(result).to.eql([]);
    });
    it('removes from an overlapping range', () => {
      const set = new RangeSet([{"range": [0,2]}]);
      const result = set.remove({"range": [0,10]});

      expect(result).to.eql([]);
    });

    // --------
    // xx  xxxx
    //  xxxx
    // x    xxx
    it('removes from two overlapping ranges', () => {
      const set = new RangeSet([{"range": [0,2]},{"range": [4,8]}]);
      const result = set.remove({"range": [1,5]});

      expect(result).to.eql([{"range": [0,1]},{"range": [5,8]}]);
    });

    // ------
    //   xx
    //   xx
    it('removes if exact range exists', () => {
      const set = new RangeSet([{"range": [2,4]}]);
      const result = set.remove({"range": [2,4]});

      expect(result).to.eql([]);
    });

    // ----------
    // xxxxxxxxxx
    //   xx
    // xx  xxxxxx
    it('removes if overlaops with range', () => {
      const set = new RangeSet([{"range": [0,10]}]);
      const result = set.remove({"range": [2,4]});

      expect(result).to.eql([{"range": [0,2]},{"range": [4,10]}]);
    });
  });

  describe('#intersect', () => {
    it('returns empty collection if there is no set', () => {
      const set = new RangeSet();
      const result = set.intersect({"range": [6,8]});

      expect(result).to.eql([]);
    });

    it('returns empty collection if there is no intersection', () => {
      const set = new RangeSet([{"range": [2,4]}]);
      const result = set.intersect({"range": [6,8]});

      expect(result).to.eql([]);
    });

    it('returns intersecting elements', () => {
      const set = new RangeSet([{"range": [0,10]}]);
      const result = set.intersect({"range": [2,4]});

      expect(result).to.eql([{"range": [2,4]}]);
    });

    it('returns multiple intersecting ranges', () => {
      const set = new RangeSet([{"range": [0,5]}, {"range": [8,12]}]);
      const result = set.intersect({"range": [4,10]});

      expect(result).to.eql([{"range":[4,5]},{"range":[8,10]}]);
    });

    it('returns every intersecting range chunk', () => {
      const set = new RangeSet([{"range": [15,19]}, {"range": [10,15]}]);
      const result = set.intersect({"range": [0,20]});

      expect(result).to.eql([
        {"range":[15,19]}, {"range":[10,15]}
      ]);
    });
  });
});
