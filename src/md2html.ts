#!/usr/bin/env node

import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import doc from "rehype-document";
import stringify from "rehype-stringify";
import { VFile } from "vfile";
import yargs from "yargs";
import vfile from "to-vfile";

async function md2html(markdown: VFile, docOptions?: object): Promise<VFile> {
  const html = await unified()
    .use(parse)
    .use(mutate)
    .use(doc, docOptions)
    .use(stringify)
    .process(markdown);
  html.extname = ".html";
  return html;
}

const argv = yargs
  .usage("$0 <path>... [-c <path>]")
  .demandCommand(1)
  .example("$0 README.md", "desc")
  .alias("c", "css")
  .array("c")
  .describe("c", "CSS to include in <head> element")
  .help()
  .detectLocale(false)
  .strict().argv;

vfile
  .read(argv._[0])
  .then((md: VFile) => md2html(md, { css: argv.c }))
  .then((html: VFile) => vfile.write(html));
