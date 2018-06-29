import 'mocha';
import { expect } from 'chai';
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

describe('Main', () => {
  it('Get Japanese', () => {
    index.translate(code);
    const ja = index.getJapanese();
    expect(ja).to.be.equals('React Component を つくる'); // 適当
  });
});
