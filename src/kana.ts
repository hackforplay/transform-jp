import generate from 'babel-generator';
import traverse from 'babel-traverse';
import * as fs from 'fs';
import * as path from 'path';
import kanaGenerator from './kana-generator';
import KanaState from './kana-state';

const testFilePath = './test/fixtures';
const fixtures = path.resolve(testFilePath);

const files = fs.readdirSync(path.join(fixtures, 'ast'));
for (const fileName of files) {
  const extension = path.extname(fileName);
  if (extension === '.json') {
    const json = fs.readFileSync(path.join(fixtures, 'ast', fileName), {
      encoding: 'utf8'
    });
    const ast = JSON.parse(json);
    const state: KanaState = { comments: [] };
    traverse(ast, kanaGenerator, null, state); // kana
    const result = generate(ast, {}); // javascript
    const code = mergeComments(result.code, state.comments); // merge both
    console.log(state.comments);

    const basename = path.basename(fileName, 'json');
    fs.writeFileSync(path.join(fixtures, 'kana', basename + 'js'), code);
  }
}

function mergeComments(code: string, comments: Array<string>) {
  return code
    .split('\n')
    .map((textOfCode, lineOfCode) => {
      if (comments[lineOfCode + 1]) {
        return comments[lineOfCode + 1] + '\n' + textOfCode;
      } else {
        return textOfCode;
      }
    })
    .join('\n');
}
