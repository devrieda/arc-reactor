import expect from 'expect';
import ConfigManager from '../ConfigManager';

describe('ConfigManager', () => {
  describe('#install', () => {
    it('doesnt die if config is empty', () => {
      const config = {};
      ConfigManager.install(config)
    });
  });
});
