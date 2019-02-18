# md2pdf

> Generate HTML and PDF from Markdown.

## Getting Started

### Install

```sh
$ npm i && npm run build && npm ln
$ md2pdf --version
```

### Usage

```sh
$ md2pdf --help
md2pdf.js <path> [-h] [-c path...] [-j path...] <-p path> [-s size]

Options:
  --version       Show version number                                  [boolean]
  -h, --highlite  Use highlight.js                    [boolean] [default: false]
  -c, --css       CSS to include in <head> element                       [array]
  -j, --js        JS to include at end of <body> element                 [array]
  -p, --path      Path to your Chrome                        [string] [required]
  -s, --size      Size of PDF                                    [default: "A5"]
  --help          Show help                                            [boolean]

Examples:
  md2pdf.js README.md  Generate README.pdf

```

Concrete examples are in the [examples/](examples/).

## License

[MIT](LICENSE)
