import generate from 'babel-generator';
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
    const result = generate(ast, {});
    const basename = path.basename(fileName, 'json');
    fs.writeFileSync(
      path.join(fixtures, 'output', basename + 'js'),
      result.code
    );
  }
}
