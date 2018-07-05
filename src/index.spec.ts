import { test } from 'ava';
import * as index from './index';

const code = `
export default React.createClass({
  getInitialState() {
    return { num: this.getRandomNumber() };
  },

  getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }
});`;

test('get Japanese', async t => {
  index.translate(code);
  const ja = index.getJapanese();

  t.is(ja, 'React Component を つくる'); // 適当
});
