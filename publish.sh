#!/bin/bash

rm -rf lib/

npm ci
npm run build -- --sourceMap false --declarationMap false
npm test

npm publish