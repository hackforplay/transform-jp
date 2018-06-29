import * as Babel from 'babel-standalone';
// import fs from 'fs';
import plugin from './plugin';
import { parse } from 'babylon';
import generate from 'babel-generator';
import traverse from 'babel-traverse';

Babel.registerPlugin('hoge', plugin);

export function translate(code: string) {
  console.log('translate');
  const ast = parse(code, { sourceType: 'module' });
  // fs.writeFileSync('ast.json', JSON.stringify(ast, null, 2));
  traverse(ast, plugin);
  return generate(ast);
}

const japaneseSentenses: Array<Array<String>> = [];
export function getJapanese() {
  return japaneseSentenses
    .map(words => words.filter(w => w).join(' '))
    .filter(line => line)
    .join('\n');
}
export function setJapanese(line: number, column: number, text: string) {
  console.log(line, column, text);
  japaneseSentenses[line] = japaneseSentenses[line] || [];
  japaneseSentenses[line][column] = text;
}
