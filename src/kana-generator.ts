import * as t from 'babel-types';
import { NodePath } from 'babel-traverse';
import S from './kana-state';

function set(state: S, line: number, column: number, kana: string) {
  if (!state.comments[line]) {
    // この行の最初のワードなのでインデントと '//' を入れる
    state.comments[line] = ' '.repeat(column) + '// ' + kana;
  } else {
    // ワードとワードの間にスペースを入れる
    state.comments[line] = state.comments[line] + ' ' + kana;
  }
}

export default {
  ArrayExpression() {
    n(arguments);
  },
  AssignmentExpression() {
    n(arguments);
  },
  LVal() {
    n(arguments);
  },
  Expression() {
    n(arguments);
  },
  BinaryExpression() {
    n(arguments);
  },
  Directive() {
    n(arguments);
  },
  DirectiveLiteral() {
    n(arguments);
  },
  BlockStatement() {
    n(arguments);
  },
  BreakStatement() {
    n(arguments);
  },
  Identifier(path: NodePath<t.Identifier>, state: S) {
    const { line, column } = path.node.loc.start;
    switch (path.parent.type) {
      case 'ObjectProperty':
        set(state, line, column, `の${path.node.name}`);
        break;
      case 'ObjectMethod':
        set(state, line, column, `の関数${path.node.name}`);
        break;
      case 'MemberExpression':
        set(state, line, column, `${path.node.name}`);
        break;
      default:
        set(state, line, column, `変数${path.node.name}`);
        break;
    }
  },
  CallExpression() {
    n(arguments);
  },
  CatchClause() {
    n(arguments);
  },
  ConditionalExpression() {
    n(arguments);
  },
  ContinueStatement() {
    n(arguments);
  },
  DebuggerStatement() {
    n(arguments);
  },
  DoWhileStatement() {
    n(arguments);
  },
  Statement() {
    n(arguments);
  },
  EmptyStatement() {
    n(arguments);
  },
  ExpressionStatement() {
    n(arguments);
  },
  File() {
    n(arguments);
  },
  Program() {},
  ForInStatement() {
    n(arguments);
  },
  /**
   * 新規作成 変数hoge
   * 新規作成 変数hoge 入れろ 文字列「fuga」
   * @param path
   * @param state
   */
  VariableDeclaration(path: NodePath<t.VariableDeclaration>, state: S) {
    const { line, column } = path.node.loc.start;
    let kana = '新規作成 変数';
    const { id, init } = path.node.declarations[0];
    if (t.isIdentifier(id)) {
      kana += id.name;
    }
    if (t.isStringLiteral(init)) {
      kana += ' 入れろ 文字列' + init.value;
    }
    set(state, line, column, kana);
  },
  ForStatement() {
    n(arguments);
  },
  FunctionDeclaration() {
    n(arguments);
  },
  FunctionExpression() {
    n(arguments);
  },
  IfStatement() {
    n(arguments);
  },
  LabeledStatement() {
    n(arguments);
  },
  StringLiteral() {
    n(arguments);
  },
  NumericLiteral() {
    n(arguments);
  },
  NullLiteral() {
    n(arguments);
  },
  BooleanLiteral() {
    n(arguments);
  },
  RegExpLiteral() {
    n(arguments);
  },
  LogicalExpression() {
    n(arguments);
  },
  MemberExpression() {
    n(arguments);
  },
  NewExpression() {
    n(arguments);
  },
  ObjectExpression() {
    n(arguments);
  },
  ObjectMethod() {
    n(arguments);
  },
  ObjectProperty() {
    n(arguments);
  },
  RestElement() {
    n(arguments);
  },
  ReturnStatement(path: NodePath<t.ReturnStatement>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, '呼び出し元に返せ');
  },
  SequenceExpression() {
    n(arguments);
  },
  SwitchCase() {
    n(arguments);
  },
  SwitchStatement() {
    n(arguments);
  },
  ThisExpression() {
    n(arguments);
  },
  ThrowStatement() {
    n(arguments);
  },
  TryStatement() {
    n(arguments);
  },
  UnaryExpression() {
    n(arguments);
  },
  UpdateExpression() {
    n(arguments);
  },
  VariableDeclarator() {
    n(arguments);
  },
  WhileStatement() {
    n(arguments);
  },
  WithStatement() {
    n(arguments);
  },
  AssignmentPattern() {
    n(arguments);
  },
  ArrayPattern() {
    n(arguments);
  },
  ArrowFunctionExpression() {
    n(arguments);
  },
  ClassBody() {
    n(arguments);
  },
  ClassDeclaration() {
    n(arguments);
  },
  ClassExpression() {
    n(arguments);
  },
  ExportAllDeclaration() {
    n(arguments);
  },
  ExportDefaultDeclaration() {
    n(arguments);
  },
  ExportNamedDeclaration() {
    n(arguments);
  },
  Declaration() {
    n(arguments);
  },
  ExportSpecifier() {
    n(arguments);
  },
  ForOfStatement() {
    n(arguments);
  },
  /**
   * 別の場所からとってこい 変数hogeA 場所は 「hoge」
   * 別の場所からとってこい 全部まとめて 変数hogeB 場所は 「hoge」
   * 別の場所からとってこい 「hoge」 と 「fuga」（変数fufu） 場所は 「hoge」
   * @param path
   * @param state
   */
  ImportDeclaration(path: NodePath<t.ImportDeclaration>, state: S) {
    const { line, column } = path.node.loc.start;
    let kana = '別の場所からとってこい ';
    const identifiers = [];
    for (const specifier of path.node.specifiers) {
      if (t.isImportDefaultSpecifier(specifier)) {
        identifiers.push('変数' + specifier.local.name);
      } else if (t.isImportNamespaceSpecifier(specifier)) {
        kana += '全部まとめて ';
        identifiers.push('変数' + specifier.local.name);
      } else if (t.isImportSpecifier(specifier)) {
        if (specifier.imported.name === specifier.local.name) {
          identifiers.push(`「${specifier.imported.name}」`);
        } else {
          identifiers.push(
            `「${specifier.imported.name}」（変数${specifier.local.name}）`
          );
        }
      }
    }
    kana += identifiers.join(' と ');
    kana += ' 場所は 「' + path.node.source.value + '」';
    set(state, line, column, kana);
    path.skip();
  },
  ImportDefaultSpecifier() {},
  ImportNamespaceSpecifier() {},
  ImportSpecifier() {},
  MetaProperty() {
    n(arguments);
  },
  ClassMethod() {
    n(arguments);
  },
  ObjectPattern() {
    n(arguments);
  },
  SpreadElement() {
    n(arguments);
  },
  Super() {
    n(arguments);
  },
  TaggedTemplateExpression() {
    n(arguments);
  },
  TemplateLiteral() {
    n(arguments);
  },
  TemplateElement() {
    n(arguments);
  },
  YieldExpression() {
    n(arguments);
  },
  AnyTypeAnnotation() {
    n(arguments);
  },
  ArrayTypeAnnotation() {
    n(arguments);
  },
  BooleanTypeAnnotation() {
    n(arguments);
  },
  BooleanLiteralTypeAnnotation() {
    n(arguments);
  },
  NullLiteralTypeAnnotation() {
    n(arguments);
  },
  ClassImplements() {
    n(arguments);
  },
  ClassProperty() {
    n(arguments);
  },
  DeclareClass() {
    n(arguments);
  },
  DeclareFunction() {
    n(arguments);
  },
  DeclareInterface() {
    n(arguments);
  },
  DeclareModule() {
    n(arguments);
  },
  DeclareTypeAlias() {
    n(arguments);
  },
  DeclareVariable() {
    n(arguments);
  },
  ExistentialTypeParam() {
    n(arguments);
  },
  FunctionTypeAnnotation() {
    n(arguments);
  },
  FunctionTypeParam() {
    n(arguments);
  },
  GenericTypeAnnotation() {
    n(arguments);
  },
  InterfaceExtends() {
    n(arguments);
  },
  InterfaceDeclaration() {
    n(arguments);
  },
  IntersectionTypeAnnotation() {
    n(arguments);
  },
  MixedTypeAnnotation() {
    n(arguments);
  },
  NullableTypeAnnotation() {
    n(arguments);
  },
  NumericLiteralTypeAnnotation() {
    n(arguments);
  },
  NumberTypeAnnotation() {
    n(arguments);
  },
  StringLiteralTypeAnnotation() {
    n(arguments);
  },
  StringTypeAnnotation() {
    n(arguments);
  },
  ThisTypeAnnotation() {
    n(arguments);
  },
  TupleTypeAnnotation() {
    n(arguments);
  },
  TypeofTypeAnnotation() {
    n(arguments);
  },
  TypeAlias() {
    n(arguments);
  },
  TypeAnnotation() {
    n(arguments);
  },
  TypeCastExpression() {
    n(arguments);
  },
  TypeParameterDeclaration() {
    n(arguments);
  },
  TypeParameterInstantiation() {
    n(arguments);
  },
  ObjectTypeAnnotation() {
    n(arguments);
  },
  ObjectTypeCallProperty() {
    n(arguments);
  },
  ObjectTypeIndexer() {
    n(arguments);
  },
  ObjectTypeProperty() {
    n(arguments);
  },
  QualifiedTypeIdentifier() {
    n(arguments);
  },
  UnionTypeAnnotation() {
    n(arguments);
  },
  VoidTypeAnnotation() {
    n(arguments);
  },
  JSXAttribute() {
    n(arguments);
  },
  JSXIdentifier() {
    n(arguments);
  },
  JSXNamespacedName() {
    n(arguments);
  },
  JSXElement() {
    n(arguments);
  },
  JSXExpressionContainer() {
    n(arguments);
  },
  JSXClosingElement() {
    n(arguments);
  },
  JSXMemberExpression() {
    n(arguments);
  },
  JSXOpeningElement() {
    n(arguments);
  },
  JSXEmptyExpression() {
    n(arguments);
  },
  JSXSpreadAttribute() {
    n(arguments);
  },
  JSXText() {
    n(arguments);
  },
  Noop() {
    n(arguments);
  },
  ParenthesizedExpression() {
    n(arguments);
  },
  AwaitExpression() {
    n(arguments);
  },
  BindExpression() {
    n(arguments);
  },
  Decorator() {
    n(arguments);
  },
  DoExpression() {
    n(arguments);
  },
  ExportDefaultSpecifier() {
    n(arguments);
  },
  ExportNamespaceSpecifier() {
    n(arguments);
  },
  RestProperty() {
    n(arguments);
  },
  SpreadProperty() {
    n(arguments);
  },
  Binary() {
    n(arguments);
  },
  Scopable() {},
  BlockParent() {
    n(arguments);
  },
  Block() {
    n(arguments);
  },
  Terminatorless() {
    n(arguments);
  },
  CompletionStatement() {
    n(arguments);
  },
  Conditional() {
    n(arguments);
  },
  Loop() {
    n(arguments);
  },
  While() {
    n(arguments);
  },
  ExpressionWrapper() {
    n(arguments);
  },
  For() {
    n(arguments);
  },
  ForXStatement() {
    n(arguments);
  },
  Function() {
    n(arguments);
  },
  FunctionParent() {
    n(arguments);
  },
  Pureish() {
    n(arguments);
  },
  Literal() {
    n(arguments);
  },
  Immutable() {
    n(arguments);
  },
  UserWhitespacable() {
    n(arguments);
  },
  Method() {
    n(arguments);
  },
  ObjectMember() {
    n(arguments);
  },
  Property() {
    n(arguments);
  },
  UnaryLike() {
    n(arguments);
  },
  Pattern() {
    n(arguments);
  },
  Class() {
    n(arguments);
  },
  ModuleDeclaration() {
    n(arguments);
  },
  ExportDeclaration() {
    n(arguments);
  },
  ModuleSpecifier() {
    n(arguments);
  },
  Flow() {
    n(arguments);
  },
  FlowBaseAnnotation() {
    n(arguments);
  },
  FlowDeclaration() {
    n(arguments);
  },
  JSX() {
    n(arguments);
  },
  Scope() {}
};

function n(methodArguments: IArguments) {
  console.warn(methodArguments.callee.name + ' is not implemented');
}
