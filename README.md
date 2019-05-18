# diff-html

Node library to get the percent difference between two HTML strings

## Function

### diffHtml(inputHtml, correctHtml)

#### Params

- __inputHtml__ : string
- __correctHtml__ : string

#### Returns

- Promise\<number\>, image difference percentage of inputHtml and correctHtml

## Usage

### Code

```js
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
```

Prints `0.9982895833333333`