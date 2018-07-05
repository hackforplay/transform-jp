import * as babylon from 'babylon';
import generate from 'babel-generator';
import traverse from 'babel-traverse';
import kanaGenerator from './kana-generator';
import KanaState from './kana-state';

/**
 * コードにコメントとしてふりがなをつける
 * @param source ふりがなを付けたい JavaScript ソースコード
 */
export default function kana(source: string) {
  const ast = babylon.parse(source, { sourceType: 'module' });
  const state: KanaState = { kanas: [] };
  traverse(ast, kanaGenerator, null, state); // kana
  const result = generate(ast, {}); // javascript
  const code = mergeComments(result.code, state); // merge both
  return code;
}

/**
 * コードとふりがなをまとめる
 * @param code javascript コード
 * @param state ふりがな配列をもつオブジェクト
 */
function mergeComments(code: string, state: KanaState) {
  if (!state.kanas.length) {
    return '';
  }
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
  let result = code
    .split('\n')
    .map((textOfCode, lineOfCode) => {
      if (commentsOfEachLine[lineOfCode + 1]) {
        return commentsOfEachLine[lineOfCode + 1] + '\n' + textOfCode;
      } else {
        return textOfCode;
      }
    })
    .join('\n');

  // ファイルの最後に改行をつける
  if (result.charAt(result.length - 1) !== '\n') {
    result += '\n';
  }

  return result;
}
