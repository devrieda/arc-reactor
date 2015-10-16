import React from 'react';
import expect from 'expect';
import ConfigManager from '../ConfigManager';
import BlockConfig from '../Config/BlockConfig';
import KeyConfig from '../Config/KeyConfig';
import MenuButtonConfig from '../Config/MenuButtonConfig';
import BarButtonConfig from '../Config/BarButtonConfig';

describe('ConfigManager', () => {
  beforeEach(function() {
    BlockConfig.reset();
    KeyConfig.reset();
    MenuButtonConfig.reset();
    BarButtonConfig.reset();
  });

  describe('#install', () => {
    it('doesnt die if config is empty', () => {
      const config = {};
      ConfigManager.install(config);
    });

    it('installs arc plugins', () => {
      const config = {
        arcPlugins() {
          return ['h1'];
        }
      };
      ConfigManager.install(config);
      expect(BlockConfig.get('h1')).toExist();
    });

    it('installs custom plugins', () => {
      const Block = React.createClass({
        statics: {
          getName: () => "foo",
          matches: () => false
        },
        render() { return <div />; }
      });

      const Plugin = {
        installBlocks(config) {
          config.use(Block);
        }
      };

      const config = {
        plugins() {
          return [{ name: "foo", src: Plugin }];
        }
      };

      ConfigManager.install(config);
      expect(BlockConfig.get('foo')).toExist();
    });

    it('configures menu buttons', () => {
      const config = {
        menuButtons() {
          return ["italic", "bold"];
        }
      };
      ConfigManager.install(config);

      const items = MenuButtonConfig.getItems();
      const names = items.map((i) => i.getName());
      expect(names).toEqual(["italic", "bold"]);
    });

    it('configures bar buttons', () => {
      const config = {
        barButtons() {
          return [];
        }
      }
      ConfigManager.install(config)

      const items = BarButtonConfig.getItems();
      const names = items.map((i) => i.getName());
      expect(names).toEqual([]);
    });
  });
});
