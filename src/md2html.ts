#!/usr/bin/env node

import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import highlight from "rehype-highlight";
import doc from "rehype-document";
import stringify from "rehype-stringify";
import { VFile } from "vfile";
import yargs from "yargs";
import vfile from "to-vfile";

async function md2html(
  markdown: VFile,
  hjs: boolean,
  docOptions?: object
): Promise<VFile> {
  const html = await unified()
    .use(parse)
    .use(mutate)
    .use(hjs ? [[highlight, { ignoreMissing: true }]] : [])
    .use(doc, docOptions)
    .use(stringify)
    .process(markdown);
  html.extname = ".html";
  return html;
}

const argv = yargs
  .usage("$0 <path> [-h] [-c <path>]")
  .demandCommand(1)
  .example("$0 README.md", "Generate README.html")
  .alias("h", "highlite")
  .boolean("h")
  .default("h", false)
  .describe("h", "Use highlight.js")
  .alias("c", "css")
  .array("c")
  .describe("c", "CSS to include in <head> element")
  .help()
  .detectLocale(false)
  .strict().argv;

vfile
  .read(argv._[0])
  .then((md: VFile) => md2html(md, argv.h, { css: argv.c }))
  .then((html: VFile) => vfile.write(html));
