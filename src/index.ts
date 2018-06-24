import * as Babel from 'babel-standalone';
import plugin from './plugin';

Babel.registerPlugin('hoge', plugin);

export function translate(code: string) {
  const result = Babel.transform(code, { plugins: ['hoge'] });
  return result.code;
}
