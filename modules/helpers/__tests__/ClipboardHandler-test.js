import assign from "lodash.assign";
import ClipboardHandler from '../ClipboardHandler';

describe('ClipboardHandler', function() {
  const e = {
    preventDefault: Function.prototype,
    stopPropagation: Function.prototype
  };

  describe('#beforePaste', function() {
    it('appends dom node to capture paste', function() {
      ClipboardHandler.beforePaste();
      const div = ClipboardHandler.getDiv();
      expect(div.getAttribute('contenteditable')).to.equal('true');
    });
  });

  describe('#paste in firefox', function() {
    it('handles text clipboardData', function() {
      const event = assign(e, {
        clipboardData: {
          types: { contains: () => false },
          getData: () => "text"
        }
      });
      const callback = sinon.spy();
      ClipboardHandler.paste(event, callback);
      expect(callback.calledWith("text")).to.be.true;
    });

    it('handles html clipboardData', function() {
      const event = assign(e, {
        clipboardData: {
          types: { contains: () => true },
          getData: () => "html"
        }
      });
      const callback = sinon.spy();
      ClipboardHandler.paste(event, callback);
      expect(callback.calledWith("html")).to.be.true;
    });
  });

  describe('#paste in webkit', function() {
    it('handles text clipboardData', function() {
      const event = assign(e, {
        clipboardData: {
          types: 'text/plain',
          getData: () => "text"
        }
      });
      const callback = sinon.spy();
      ClipboardHandler.paste(event, callback);
      expect(callback.calledWith("text")).to.be.true;
    });

    it('handles html clipboardData', function() {
      const event = assign(e, {
        clipboardData: {
          types: 'text/html',
          getData: () => "html"
        }
      });
      const callback = sinon.spy();
      ClipboardHandler.paste(event, callback);
      expect(callback.calledWith("html")).to.be.true;
    });
  });

  describe('#paste in ie', function() {
    beforeEach(function() {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      this.clock.restore();
    });

    it('handles clipboardData from ie', function() {
      const callback = sinon.spy();
      ClipboardHandler.beforePaste();
      ClipboardHandler.paste({}, callback);
      this.clock.tick(10);
      expect(callback.called).to.be.true;
    });
  });
});
