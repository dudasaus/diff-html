const diffHtml = require('./diff-html');

// diffHtml example
async function main() {
  const match = await diffHtml(
    '<h1>Hello world</h1>',
    '<h1>hello world</h1>'
  );

  console.log(match);
}

main();
