// 参考文档：https://www.prettier.cn/docs/options.html
module.exports = {
  // 一行代码的最大字符数，默认是80
  printWidth: 80,
  // tab宽度为2空格
  tabWidth: 2,
  // 是否使用tab来缩进
  useTabs: false,
  // 结尾是否添加分号
  semi: false,
  // 是否使用单引号
  singleQuote: true,
  // 对象属性的引号使用，可选值"<as-needed|consistent|preserve>"
  // as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
  quoteProps: 'as-needed',
  // 多行时尽可能打印尾随逗号，可选值"<none|es5|all>"
  trailingComma: 'es5',
  // 字面量对象括号中的空格，如 { foo: bar }
  bracketSpacing: true,
  // 箭头函数单个参数的情况是否省略括号，可选值"<always|avoid>"，默认always为总是带括号，如 (x) => x
  arrowParens: 'always',
  // 行尾换行符，可选值"<lf|crlf|cr|auto>"
  endOfLine: 'lf',
}
