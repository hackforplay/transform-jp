let i = 0;

export default function() {
  return {
    visitor: {
      CallExpression(path: any) {
        console.log(++i);
        console.log(path.node);
      },
      Identifier(path: any) {
        console.log(++i);
        console.log(path.node);

        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split('')
          .reverse()
          .join('');
      }
    }
  };
}
