export default interface KanaState {
  kanas: Array<{
    line: number;
    column: number;
    value: string;
  }>;
}
