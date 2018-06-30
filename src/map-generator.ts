const generators: {
  [label: string]: (value: string) => string;
} = {};

generators['==/!='] = value => {
  switch (value) {
    case '===':
      return `左と右が全く同じ`;
    case '!==':
      return `左と右が全く同じではない`;
    case '==':
      return `左と右が異なってはいない`;
    case '!=':
      return `左と右が異なる`;
  }
};
generators['*'] = () => `すべて`;
generators['eof'] = () => '';
generators['='] = () => `入れろ`;
generators[','] = () => `と、`;
generators['for'] = () => `くりかえす`;
generators['if'] = () => `もし〜なら`;
generators['+/-'] = value => value;
generators['const'] = generators['let'] = generators['var'] = () => '新規作成';
generators['import'] = () => '他のファイルから読み込み';
generators['string'] = value => `文字列'${value}'`;
generators['number'] = value => `数値${value}`;

generators['name'] = value => {
  switch (value) {
    case 'from':
      return 'ファイル';
    case 'as':
      return 'ひとつにまとめる';
    case 'of':
      return `右からひとつ取り出して左に入れる`;
    default:
      return value;
  }
};

export default function generate(ast: any) {
  return ast.tokens
    .reduce(reducer, [])
    .slice(1)
    .join('\n');
}

function reducer(previous: Array<String>, token: any) {
  const { line, column } = token.loc.start;
  if (!previous[line]) {
    // この行の最初のワードなのでインデントを入れる
    previous[line] = ' '.repeat(column) + stringify(token);
  } else {
    // ワードとワードの間にスペースを入れる
    previous[line] = previous[line] + ' ' + stringify(token);
  }
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
    const generator = generators[token.type.label];
    if (generator) {
      segment = generator(token.value);
    } else {
      segment = token.type.label;
    }
  }

  return segment;
}
