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

    const text = ast.tokens
      .reduce(reducer, [])
      .slice(1)
      .join('\n');
    const basename = path.basename(fileName, 'json');
    fs.writeFileSync(path.join(fixtures, 'concat', basename + 'js'), text);
  }
}

function reducer(previous: Array<String>, token: any) {
  const { line } = token.loc.start;
  previous[line] = previous[line]
    ? previous[line] + ' ' + stringify(token)
    : stringify(token);
  return previous;
}

function stringify(token: any) {
  let segment;

  if (typeof token.type === 'string') {
    switch (token.type) {
      case 'CommentLine':
        segment = `//${token.value}`;
        break;
      default:
        segment = JSON.stringify(token);
    }
  } else {
    switch (token.type.label) {
      case 'eof':
        break;
      case 'name':
      case '==/!=':
      case '+/-':
      case '*//':
        segment = token.value;
        break;
      case 'string':
        segment = `'${token.value}'`;
        break;
      default:
        segment = token.type.label;
    }
  }

  return segment;
}
