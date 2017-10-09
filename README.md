# Markdown to HTML
Generate HTML from Markdown. You can insert arbitrary tags or apply CSS.

## Install
```sh
git clone https://github.com/ahuglajbclajep/Markdown-to-HTML.git
cd Markdown-to-HTML
npm i
```

## Usage
After editing Markdown file in the *src* folder, execute the following command:
```sh
npm run build
```
Minify html is created in the *dist* folder.

## Example of output HTML
For details, convert [examples](src/examples) and check them.  
It is roughly as follows:  
```markdown
---
title: "Hello world"
layout: "src/template.jade"
---

# Hello world
Hello, world!
```
to
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello world</title>
  </head>
  <body>
    <h1>Hello world</h1>
    <p>Hello, world!</p>
  </body>
</html>
```
By editing template you can insert arbitrary tags or apply CSS.

## License
[MIT](LICENSE)
