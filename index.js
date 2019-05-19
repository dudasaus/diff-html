const diffHtml = require('./diff-html');

async function main() {
  // diffHtml example
  let match = await diffHtml(
    '<h1>Hello world</h1>',
    '<h1>hello world</h1>'
  );

  console.log(match); // 0.9982895833333333

  // diffHtml example with viewport change
  match = await diffHtml(
    '<h1>Hello world</h1>',
    '<h1>hello world</h1>',
    { width: 300, height: 100 }
  );

  console.log(match); // 0.9726333333333333
}

main();
