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
// 新規作成 変数fixtures
const fixtures = path.resolve(testFilePath);

// 新規作成 変数files
const files = fs.readdirSync(path.join(fixtures, 'js'));
     // 新規作成 変数fileName 変数files
for (const fileName of files) {
  // 新規作成 変数extension
  const extension = path.extname(fileName);
      // 変数extension ===
  if (extension === '.js') {
    // 新規作成 変数code
    const code = fs.readFileSync(path.join(fixtures, 'js', fileName), {
      encoding: 'utf8'
    });
    // 新規作成 変数ast
    const ast = parse(code, { sourceType: 'module' });
    // 新規作成 変数json
    const json = JSON.stringify(ast, null, 2);
    // 新規作成 変数basename
    const basename = path.basename(fileName, 'js');
    // fs writeFileSync path join 変数fixtures 文字列ast 変数basename + 変数json
    fs.writeFileSync(path.join(fixtures, 'ast', basename + 'json'), json);
  }
}