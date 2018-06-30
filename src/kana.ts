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
    const state: KanaState = { kanas: [] };
    traverse(ast, kanaGenerator, null, state); // kana
    console.log(state.kanas);
    const result = generate(ast, {}); // javascript
    const code = mergeComments(result.code, state); // merge both

    const basename = path.basename(fileName, 'json');
    fs.writeFileSync(path.join(fixtures, 'kana', basename + 'js'), code);
  }
}

/**
 * コードとふりがなをまとめる
 * @param code javascript コード
 * @param state ふりがな配列をもつオブジェクト
 */
function mergeComments(code: string, state: KanaState) {
  state.kanas.sort(
    (a, b) => (a.line !== b.line ? a.line - b.line : a.column - b.column)
  );
  const commentsOfEachLine: Array<string> = [];
  for (const segment of state.kanas) {
    const { line, column, value } = segment;
    if (!commentsOfEachLine[line]) {
      // この行の最初のワードなのでインデントと '//' を入れる
      commentsOfEachLine[line] = ' '.repeat(column) + '// ' + value;
    } else {
      // ワードとワードの間にスペースを入れる
      commentsOfEachLine[line] = commentsOfEachLine[line] + ' ' + value;
    }
  }
  return code
    .split('\n')
    .map((textOfCode, lineOfCode) => {
      if (commentsOfEachLine[lineOfCode + 1]) {
        return commentsOfEachLine[lineOfCode + 1] + '\n' + textOfCode;
      } else {
        return textOfCode;
      }
    })
    .join('\n');
}
