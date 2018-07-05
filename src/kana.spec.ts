import { test } from 'ava';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import kana from './kana';

const pathes = {
  inputs: path.resolve(__dirname, '../test/fixtures/inputs'),
  outputs: path.resolve(__dirname, '../test/fixtures/outputs'),
  result: path.resolve(__dirname, '../test/tmp/result')
};

test.before.cb(t => {
  // tmp ディレクトリがなければ作る
  mkdirp(pathes.result, t.end);
});

const fileNames = require('fs').readdirSync(pathes.inputs, 'utf8');

for (const fileName of fileNames) {
  test(fileName, async t => {
    const inputPath = path.resolve(pathes.inputs, fileName);
    const input = await fs.readFile(inputPath, { encoding: 'utf8' });
    const outputPath = path.resolve(pathes.outputs, fileName);
    const output = await fs.readFile(outputPath, { encoding: 'utf8' });

    const result = kana(input);
    t.is(result, output);

    const tmpPath = path.resolve(pathes.result, fileName);
    fs.writeFile(tmpPath, result);
  });
}
