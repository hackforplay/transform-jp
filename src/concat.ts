import * as fs from 'fs';
import * as path from 'path';

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

    const text = ast.tokens.map(stringify).join('');
    const basename = path.basename(fileName, 'json');
    fs.writeFileSync(path.join(fixtures, 'concat', basename + 'js'), text);
  }
}

function stringify(token: any) {
  let segment = '';
  const { line, column } = token.loc.start;

  // 改行は0文字目から始まるという安直な考え方
  if (line > 1 && column === 0) {
    segment += '\n';
  }
  // 単語間のスペースをあけておく
  if (column > 0) {
    segment = ' ' + segment;
  }
  // value がある場合はそれを出力
  if (token.value) {
    segment += token.value;
  }
  // value がない場合は type.label があればそれを出力
  else if (token.type.label && token.type.label !== 'eof') {
    segment += token.type.label;
  }
  // コメントの場合は "//" をつける
  if (token.type === 'CommentLine') {
    segment = '//' + token.value;
  }
  return segment;
}
