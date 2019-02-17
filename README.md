# md2html

> Generate HTML from Markdown.

## Getting Started

### Install

```sh
$ npm i && npm run build && npm ln
$ md2html --version
```

### Usage

```sh
$ md2html --help
md2html.js <path> [-h] [-c <path>]

Options:
  --version       Show version number                                  [boolean]
  -h, --highlite  Use highlight.js                    [boolean] [default: false]
  -c, --css       CSS to include in <head> element                       [array]
  --help          Show help                                            [boolean]

Examples:
  md2html.js README.md  Generate README.html
```

Concrete examples are in the [examples/](examples/).

## License

[MIT](LICENSE)
