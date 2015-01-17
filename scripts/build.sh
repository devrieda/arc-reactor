#!/bin/sh
npm run build
npm run build-min
echo "gzipped, the global build is:"
echo "`gzip -c dist/react-editor.min.js | wc -c` bytes"
