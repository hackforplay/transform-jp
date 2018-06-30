import * as t from 'babel-types';
import { NodePath } from 'babel-traverse';
import S from './kana-state';

/**
 * 指定した行のコメント文として単語を追加する
 * @param state ミュータブルなオブジェクト
 * @param line 行数
 * @param column 文字数
 * @param value コメントに追加したいよみがな
 */
function set(state: S, line: number, column: number, value: string) {
  state.kanas.push({ line, column, value });
}

const visitor = {
  ArrayExpression() {
    no(arguments);
  },
  AssignmentExpression() {},
  LVal() {
    no(arguments);
  },
  Expression() {
    no(arguments);
  },
  BinaryExpression(path: NodePath<t.BinaryExpression>, state: S) {
    const { line, column } = path.node.loc.start;
    const { left, operator, right } = path.node;
    let kana = '';
    if (t.isIdentifier(left)) {
      kana += '変数' + left.name + ' ';
    }
    kana += operator;
    if (t.isIdentifier(right)) {
      kana += '変数' + right.name;
    }
    set(state, line, column, kana);
    path.skip();
  },
  Directive() {
    no(arguments);
  },
  DirectiveLiteral() {
    no(arguments);
  },
  BlockStatement() {
    no(arguments);
  },
  BreakStatement() {
    no(arguments);
  },
  /**
   * @param path
   * @param state
   */
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
    no(arguments);
  },
  CatchClause() {
    no(arguments);
  },
  ConditionalExpression() {
    no(arguments);
  },
  ContinueStatement() {
    no(arguments);
  },
  DebuggerStatement() {
    no(arguments);
  },
  DoWhileStatement() {
    no(arguments);
  },
  Statement() {
    no(arguments);
  },
  EmptyStatement() {
    no(arguments);
  },
  ExpressionStatement() {
    no(arguments);
  },
  File() {
    no(arguments);
  },
  Program() {},
  ForInStatement() {
    no(arguments);
  },
  /**
   * 新規作成 変数hoge
   * 新規作成 変数hoge 入れろ 文字列「fuga」
   * @param path
   * @param state
   */
  VariableDeclaration(path: NodePath<t.VariableDeclaration>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, '新規作成');
  },
  /**
   * くりかえせ 最初だけ 変数i 入れろ 数値0 もし 数値i < 数値10 ならばもう一度 毎回 数値i ひとつ増やす
   * @param path
   * @param state
   */
  ForStatement(path: NodePath<t.ForStatement>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, 'くりかえせ 最初だけ');
  },
  FunctionDeclaration() {
    no(arguments);
  },
  FunctionExpression() {
    no(arguments);
  },
  IfStatement() {
    no(arguments);
  },
  LabeledStatement() {
    no(arguments);
  },
  StringLiteral(path: NodePath<t.StringLiteral>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, '文字列' + path.node.value);
  },
  NumericLiteral(path: NodePath<t.NumericLiteral>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, '数値' + path.node.value);
  },
  NullLiteral(path: NodePath<t.NullLiteral>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, 'ヌル');
  },
  BooleanLiteral(path: NodePath<t.BooleanLiteral>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, path.node.value ? '真' : '偽');
  },
  RegExpLiteral() {
    no(arguments);
  },
  LogicalExpression() {
    no(arguments);
  },
  MemberExpression() {
    no(arguments);
  },
  NewExpression() {
    no(arguments);
  },
  ObjectExpression() {
    no(arguments);
  },
  ObjectMethod() {
    no(arguments);
  },
  ObjectProperty() {
    no(arguments);
  },
  RestElement() {
    no(arguments);
  },
  ReturnStatement(path: NodePath<t.ReturnStatement>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, '呼び出し元に返せ');
  },
  SequenceExpression() {
    no(arguments);
  },
  SwitchCase() {
    no(arguments);
  },
  SwitchStatement() {
    no(arguments);
  },
  ThisExpression() {
    no(arguments);
  },
  ThrowStatement() {
    no(arguments);
  },
  TryStatement() {
    no(arguments);
  },
  UnaryExpression() {
    no(arguments);
  },
  UpdateExpression: {
    exit(path: NodePath<t.UpdateExpression>, state: S) {
      const { line, column } = path.node.loc.start;
      const { operator } = path.node;
      let kana = '';
      switch (operator) {
        case '++':
          kana = '１ふやす';
          break;
        case '--':
          kana = '１へらす';
          break;
      }
      set(state, line, column, kana);
      path.skip();
    }
  },
  VariableDeclarator(path: NodePath<t.VariableDeclarator>, state: S) {
    const { line, column } = path.node.loc.start;
    const { id, init } = path.node;
    let kana = '変数';
    if (t.isIdentifier(id)) {
      kana += id.name;
    }
    if (t.isStringLiteral(init)) {
      kana += ' 入れろ 文字列' + init.value;
    } else if (t.isNumericLiteral(init)) {
      kana += ' 入れろ 数値' + init.value;
    } else if (t.isNullLiteral(init)) {
      kana += ' 入れろ ヌル';
    } else if (t.isBooleanLiteral(init)) {
      kana += ' 入れろ ' + init.value;
    }
    set(state, line, column, kana);
    path.skip();
  },
  WhileStatement() {
    no(arguments);
  },
  WithStatement() {
    no(arguments);
  },
  AssignmentPattern() {
    no(arguments);
  },
  ArrayPattern() {
    no(arguments);
  },
  ArrowFunctionExpression() {
    no(arguments);
  },
  ClassBody() {
    no(arguments);
  },
  ClassDeclaration() {
    no(arguments);
  },
  ClassExpression() {
    no(arguments);
  },
  ExportAllDeclaration() {
    no(arguments);
  },
  ExportDefaultDeclaration() {
    no(arguments);
  },
  ExportNamedDeclaration() {
    no(arguments);
  },
  Declaration() {
    no(arguments);
  },
  ExportSpecifier() {
    no(arguments);
  },
  ForOfStatement() {
    no(arguments);
  },
  /**
   * 別の場所からとってこい 変数hogeA 場所は 「hoge」
   * 別の場所からとってこい 全部まとめて 変数hogeB 場所は 「hoge」
   * 別の場所からとってこい 「hoge」  「fuga」（変数fufu） 場所は 「hoge」
   */
  ImportDeclaration: {
    enter(path: NodePath<t.ImportDeclaration>, state: S) {
      const { line, column } = path.node.loc.start;
      set(state, line, column, '別の場所からとってこい');
    },
    exit(path: NodePath<t.ImportDeclaration>, state: S) {
      const { line, column } = path.node.loc.end;
      set(state, line, column, ' 場所は 「' + path.node.source.value + '」');
    }
  },
  ImportDefaultSpecifier(path: NodePath<t.ImportDefaultSpecifier>, state: S) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, '変数' + path.node.local.name);
    path.skip(); // TODO: 消す
  },
  ImportNamespaceSpecifier(
    path: NodePath<t.ImportNamespaceSpecifier>,
    state: S
  ) {
    const { line, column } = path.node.loc.start;
    set(state, line, column, '全部まとめて 変数' + path.node.local.name);
    path.skip(); // TODO: 消す
  },
  ImportSpecifier(path: NodePath<t.ImportSpecifier>, state: S) {
    const { line, column } = path.node.loc.start;
    if (path.node.imported.name === path.node.local.name) {
      set(state, line, column, `「${path.node.imported.name}」`);
    } else {
      set(
        state,
        line,
        column,
        `「${path.node.imported.name}→変数${path.node.local.name}」`
      );
    }
    path.skip(); // TODO: 消す
  },
  MetaProperty() {
    no(arguments);
  },
  ClassMethod() {
    no(arguments);
  },
  ObjectPattern() {
    no(arguments);
  },
  SpreadElement() {
    no(arguments);
  },
  Super() {
    no(arguments);
  },
  TaggedTemplateExpression() {
    no(arguments);
  },
  TemplateLiteral() {
    no(arguments);
  },
  TemplateElement() {
    no(arguments);
  },
  YieldExpression() {
    no(arguments);
  },
  AnyTypeAnnotation() {
    no(arguments);
  },
  ArrayTypeAnnotation() {
    no(arguments);
  },
  BooleanTypeAnnotation() {
    no(arguments);
  },
  BooleanLiteralTypeAnnotation() {
    no(arguments);
  },
  NullLiteralTypeAnnotation() {
    no(arguments);
  },
  ClassImplements() {
    no(arguments);
  },
  ClassProperty() {
    no(arguments);
  },
  DeclareClass() {
    no(arguments);
  },
  DeclareFunction() {
    no(arguments);
  },
  DeclareInterface() {
    no(arguments);
  },
  DeclareModule() {
    no(arguments);
  },
  DeclareTypeAlias() {
    no(arguments);
  },
  DeclareVariable() {
    no(arguments);
  },
  ExistentialTypeParam() {
    no(arguments);
  },
  FunctionTypeAnnotation() {
    no(arguments);
  },
  FunctionTypeParam() {
    no(arguments);
  },
  GenericTypeAnnotation() {
    no(arguments);
  },
  InterfaceExtends() {
    no(arguments);
  },
  InterfaceDeclaration() {
    no(arguments);
  },
  IntersectionTypeAnnotation() {
    no(arguments);
  },
  MixedTypeAnnotation() {
    no(arguments);
  },
  NullableTypeAnnotation() {
    no(arguments);
  },
  NumericLiteralTypeAnnotation() {
    no(arguments);
  },
  NumberTypeAnnotation() {
    no(arguments);
  },
  StringLiteralTypeAnnotation() {
    no(arguments);
  },
  StringTypeAnnotation() {
    no(arguments);
  },
  ThisTypeAnnotation() {
    no(arguments);
  },
  TupleTypeAnnotation() {
    no(arguments);
  },
  TypeofTypeAnnotation() {
    no(arguments);
  },
  TypeAlias() {
    no(arguments);
  },
  TypeAnnotation() {
    no(arguments);
  },
  TypeCastExpression() {
    no(arguments);
  },
  TypeParameterDeclaration() {
    no(arguments);
  },
  TypeParameterInstantiation() {
    no(arguments);
  },
  ObjectTypeAnnotation() {
    no(arguments);
  },
  ObjectTypeCallProperty() {
    no(arguments);
  },
  ObjectTypeIndexer() {
    no(arguments);
  },
  ObjectTypeProperty() {
    no(arguments);
  },
  QualifiedTypeIdentifier() {
    no(arguments);
  },
  UnionTypeAnnotation() {
    no(arguments);
  },
  VoidTypeAnnotation() {
    no(arguments);
  },
  JSXAttribute() {
    no(arguments);
  },
  JSXIdentifier() {
    no(arguments);
  },
  JSXNamespacedName() {
    no(arguments);
  },
  JSXElement() {
    no(arguments);
  },
  JSXExpressionContainer() {
    no(arguments);
  },
  JSXClosingElement() {
    no(arguments);
  },
  JSXMemberExpression() {
    no(arguments);
  },
  JSXOpeningElement() {
    no(arguments);
  },
  JSXEmptyExpression() {
    no(arguments);
  },
  JSXSpreadAttribute() {
    no(arguments);
  },
  JSXText() {
    no(arguments);
  },
  Noop() {
    no(arguments);
  },
  ParenthesizedExpression() {
    no(arguments);
  },
  AwaitExpression() {
    no(arguments);
  },
  BindExpression() {
    no(arguments);
  },
  Decorator() {
    no(arguments);
  },
  DoExpression() {
    no(arguments);
  },
  ExportDefaultSpecifier() {
    no(arguments);
  },
  ExportNamespaceSpecifier() {
    no(arguments);
  },
  RestProperty() {
    no(arguments);
  },
  SpreadProperty() {
    no(arguments);
  },
  Binary() {
    no(arguments);
  },
  Scopable() {},
  BlockParent() {
    no(arguments);
  },
  Block() {
    no(arguments);
  },
  Terminatorless() {
    no(arguments);
  },
  CompletionStatement() {
    no(arguments);
  },
  Conditional() {
    no(arguments);
  },
  Loop() {
    no(arguments);
  },
  While() {
    no(arguments);
  },
  ExpressionWrapper() {
    no(arguments);
  },
  For() {
    no(arguments);
  },
  ForXStatement() {
    no(arguments);
  },
  Function() {
    no(arguments);
  },
  FunctionParent() {
    no(arguments);
  },
  Pureish() {
    no(arguments);
  },
  Literal() {
    no(arguments);
  },
  Immutable() {
    no(arguments);
  },
  UserWhitespacable() {
    no(arguments);
  },
  Method() {
    no(arguments);
  },
  ObjectMember() {
    no(arguments);
  },
  Property() {
    no(arguments);
  },
  UnaryLike() {
    no(arguments);
  },
  Pattern() {
    no(arguments);
  },
  Class() {
    no(arguments);
  },
  ModuleDeclaration() {
    no(arguments);
  },
  ExportDeclaration() {
    no(arguments);
  },
  ModuleSpecifier() {
    no(arguments);
  },
  Flow() {
    no(arguments);
  },
  FlowBaseAnnotation() {
    no(arguments);
  },
  FlowDeclaration() {
    no(arguments);
  },
  JSX() {
    no(arguments);
  },
  Scope() {}
};

export default visitor;

function no(methodArguments: IArguments) {
  console.warn(methodArguments.callee.name + ' is not implemented');
}
