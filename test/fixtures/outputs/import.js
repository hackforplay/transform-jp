// 別の場所からとってこい 変数modDefault 文字列hoge  場所は 「hoge」
import modDefault from 'hoge';
// 別の場所からとってこい 全部まとめて 変数modNamespace 文字列hoge  場所は 「hoge」
import * as modNamespace from 'hoge';
// 別の場所からとってこい 「module1」 「module2→変数localName」 文字列hoge  場所は 「hoge」
import { module1, module2 as localName } from 'hoge';
