declare module 'babel-standalone' {
  export var availablePlugins: {
    'check-es2015-constants': Function;
    'external-helpers': Function;
    'inline-replace-variables': Function;
    'syntax-async-functions': Function;
    'syntax-async-generators': Function;
    'syntax-class-constructor-call': Function;
    'syntax-class-properties': Function;
    'syntax-decorators': Function;
    'syntax-do-expressions': Function;
    'syntax-exponentiation-operator': Function;
    'syntax-export-extensions': Function;
    'syntax-flow': Function;
    'syntax-function-bind': Function;
    'syntax-function-sent': Function;
    'syntax-jsx': Function;
    'syntax-object-rest-spread': Function;
    'syntax-trailing-function-commas': Function;
    'transform-async-functions': Function;
    'transform-async-to-generator': Function;
    'transform-async-to-module-method': Function;
    'transform-class-constructor-call': Function;
    'transform-class-properties': Function;
    'transform-decorators': Function;
    'transform-decorators-legacy': Function;
    'transform-do-expressions': Function;
    'transform-es2015-arrow-functions': Function;
    'transform-es2015-block-scoped-functions': Function;
    'transform-es2015-block-scoping': Function;
    'transform-es2015-classes': Function;
    'transform-es2015-computed-properties': Function;
    'transform-es2015-destructuring': Function;
    'transform-es2015-duplicate-keys': Function;
    'transform-es2015-for-of': Function;
    'transform-es2015-function-name': Function;
    'transform-es2015-instanceof': Function;
    'transform-es2015-literals': Function;
    'transform-es2015-modules-amd': Function;
    'transform-es2015-modules-commonjs': Function;
    'transform-es2015-modules-systemjs': Function;
    'transform-es2015-modules-umd': Function;
    'transform-es2015-object-super': Function;
    'transform-es2015-parameters': Function;
    'transform-es2015-shorthand-properties': Function;
    'transform-es2015-spread': Function;
    'transform-es2015-sticky-regex': Function;
    'transform-es2015-template-literals': Function;
    'transform-es2015-typeof-symbol': Function;
    'transform-es2015-unicode-regex': Function;
    'transform-es3-member-expression-literals': Function;
    'transform-es3-property-literals': Function;
    'transform-es5-property-mutators': Function;
    'transform-eval': Function;
    'transform-exponentiation-operator': Function;
    'transform-export-extensions': Function;
    'transform-flow-comments': Function;
    'transform-flow-strip-types': Function;
    'transform-function-bind': Function;
    'transform-jscript': Function;
    'transform-object-assign': Function;
    'transform-object-rest-spread': Function;
    'transform-object-set-prototype-of-to-assign': Function;
    'transform-proto-to-assign': Function;
    'transform-react-constant-elements': Function;
    'transform-react-display-name': Function;
    'transform-react-inline-elements': Function;
    'transform-react-jsx': Function;
    'transform-react-jsx-compat': Function;
    'transform-react-jsx-self': Function;
    'transform-react-jsx-source': Function;
    'transform-regenerator': { __esModule: true; default: Function };
    'transform-runtime': {
      __esModule: true;
      definitions: [Object];
      default: Function;
    };
    'transform-strict-mode': Function;
    'undeclared-variables-check': Function;
  };
  export var availablePresets: {
    es2015: { plugins: Array<any> };
    es2016: { plugins: Array<any> };
    es2017: { plugins: Array<any> };
    latest: Function;
    react: { presets: Array<any>; plugins: Array<any>; env: [Object] };
    'stage-0': { presets: Array<any>; plugins: Array<any> };
    'stage-1': { presets: Array<any>; plugins: Array<any> };
    'stage-2': { presets: Array<any>; plugins: Array<any> };
    'stage-3': { plugins: Array<any> };
    'es2015-no-commonjs': { plugins: Array<any> };
    'es2015-loose': { plugins: Array<any> };
  };
  export var buildExternalHelpers: Function;
  export var version: string;
  export var transform: Function;
  export var transformFromAst: Function;
  export var registerPlugin: Function;
  export var registerPlugins: Function;
  export var registerPreset: Function;
  export var registerPresets: Function;
  export var transformScriptTags: Function;
  export var disableScriptTags: Function;
}
