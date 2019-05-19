# diff-html

Node library to get the percent difference between two HTML strings

## Function

### diffHtml(inputHtml, correctHtml, viewport)

Renders the HTML and returns the percent difference between generated images. If no viewport is provided, the default puppeteer viewport of 800x600 is used.

#### Params

- __inputHtml__ : string
- __correctHtml__ : string
- __viewport__ : _optional_ object
  - __width__ : number
  - __height__ : number

#### Returns

- Promise\<number\>, image difference percentage of inputHtml and correctHtml

## Usage

### Code

```js
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
```

#### Output

```
0.9982895833333333
0.9726333333333333
```