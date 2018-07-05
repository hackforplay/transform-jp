import { parse } from 'babylon';
import * as fs from 'fs';
import * as path from 'path';

let noAsign;
const testFilePath = './test/fixtures';
const fixtures = path.resolve(testFilePath);

const files = fs.readdirSync(path.join(fixtures, 'js'));
for (const fileName of files) {
  const extension = path.extname(fileName);
  if (extension === '.js') {
    const code = fs.readFileSync(path.join(fixtures, 'js', fileName), {
      encoding: 'utf8'
    });
    const ast = parse(code, { sourceType: 'module' });
    const json = JSON.stringify(ast, null, 2);
    const basename = path.basename(fileName, 'js');
    fs.writeFileSync(path.join(fixtures, 'ast', basename + 'json'), json);
  }
}
