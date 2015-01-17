#!/bin/sh
mkdir -p dist
NODE_ENV=production node_modules/.bin/browserify \
  -t [ reactify --es6 ] \
  -t sassify \
  -t browserify-shim \
  -t envify \
  --detect-globals false \
  lib/index.js \
  > dist/react-editor.js
node_modules/.bin/uglifyjs dist/react-editor.js \
  --compress warnings=false > dist/react-editor.min.js
