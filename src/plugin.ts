import { setJapanese } from './index';

export default {
  Identifier(path: any) {
    console.log('Identifier');
    const { line, column } = path.node.loc.start;
    switch (path.parent.type) {
      case 'ObjectProperty':
        setJapanese(line, column, `プロパティ${path.node.name}`);
        break;
      case 'ObjectMethod':
        setJapanese(line, column, `メソッド${path.node.name}`);
        break;
      case 'MemberExpression':
        setJapanese(line, column, `メンバー${path.node.name}`);
        break;
      default:
        setJapanese(line, column, `変数${path.node.name}`);
        break;
    }
  },
  ReturnStatement(path: any) {
    const { line, column } = path.node.loc.start;
    setJapanese(line, column, '呼び出し元に返せ');
  }
};
