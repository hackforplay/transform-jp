// 別の場所からとってこい 変数modDefault 文字列hoge  場所は 「hoge」
import modDefault from 'hoge';
// 別の場所からとってこい 全部まとめて 変数modNamespace 文字列hoge  場所は 「hoge」
import * as modNamespace from 'hoge';
// 別の場所からとってこい 「module1」 「module2→変数localName」 文字列hoge  場所は 「hoge」
import { module1, module2 as localName } from 'hoge';

// 新規作成 変数const1 入れろ 数値1
const const1 = 1;
// 新規作成 変数number
let number;
// 変数number 数値1
number = 1;
// 変数number +
number = number + 2 + 3;

// くりかえせ 最初だけ 新規作成 変数i 入れろ 数値0 変数i < 変数i １ふやす
for (let i = 0; i < 10; i++) {
  // console log 変数i
  console.log(i);
}