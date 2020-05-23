const { readFileSync } = require('fs');
const { join } = require('path');
require('@babel/register')(JSON.parse(readFileSync(join(__dirname, '..', '.babelrc'), 'utf-8')));
require('babel-polyfill');
require('reflect-metadata');
require('../src/app.js');