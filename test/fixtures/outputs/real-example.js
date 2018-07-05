// 別の場所からとってこい 「parse」 文字列babylon  場所は 「babylon」
import { parse } from 'babylon';
// 別の場所からとってこい 全部まとめて 変数fs 文字列fs  場所は 「fs」
import * as fs from 'fs';
// 別の場所からとってこい 全部まとめて 変数path 文字列path  場所は 「path」
import * as path from 'path';

// 新規作成 変数noAsign
let noAsign;
// 新規作成 変数testFilePath 入れろ 文字列./test/fixtures
const testFilePath = './test/fixtures';
// 新規作成 変数fixtures 入れろ
const fixtures = path.resolve(testFilePath);

// 新規作成 変数files 入れろ 文字列js
const files = fs.readdirSync(path.join(fixtures, 'js'));
// 新規作成 変数fileName
for (const fileName of files) {
  // 新規作成 変数extension 入れろ
  const extension = path.extname(fileName);
  // 変数extension === 文字列.js
  if (extension === '.js') {
    // 新規作成 変数code 入れろ 文字列js
    const code = fs.readFileSync(path.join(fixtures, 'js', fileName), {
      // のencoding 文字列utf8
      encoding: 'utf8'
    });
    // 新規作成 変数ast 入れろ のsourceType 文字列module
    const ast = parse(code, { sourceType: 'module' });
    // 新規作成 変数json 入れろ ヌル 数値2
    const json = JSON.stringify(ast, null, 2);
    // 新規作成 変数basename 入れろ 文字列js
    const basename = path.basename(fileName, 'js');
    // ??
    fs.writeFileSync(path.join(fixtures, 'ast', basename + 'json'), json);
  }
}
