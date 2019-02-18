#!/usr/bin/env node

import { VFile } from "vfile";
import path from "path";
import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import highlight from "rehype-highlight";
import doc from "rehype-document";
import stringify from "rehype-stringify";
import puppeteer from "puppeteer-core";
import yargs from "yargs";
import vfile from "to-vfile";

async function md2html(
  markdown: VFile,
  highlightjs: boolean,
  docOptions?: object
): Promise<VFile> {
  const html = await unified()
    .use(parse)
    .use(mutate)
    .use(highlightjs ? [[highlight, { ignoreMissing: true }]] : [])
    .use(doc, docOptions)
    .use(stringify)
    .process(markdown);
  html.extname = ".html";
  return html;
}

async function html2lpdf(
  chrome: string,
  html: VFile,
  size: string
): Promise<void> {
  const browser = await puppeteer.launch({ executablePath: chrome });
  const page = await browser.newPage();
  await page.goto(`file:${html.path}`);
  await page.pdf({
    path: `${html.stem}.pdf`,
    printBackground: true,
    format: size as any
  });
  await browser.close();
}

const argv = yargs
  .usage("$0 <path> [-h] [-c path...] [-j path...] <-p path> [-s size]")
  .demandCommand(1)
  .example("$0 README.md", "Generate README.pdf")
  .alias("h", "highlite")
  .boolean("h")
  .default("h", false)
  .describe("h", "Use highlight.js")
  .alias("c", "css")
  .array("c")
  .describe("c", "CSS to include in <head> element")
  .alias("j", "js")
  .array("j")
  .describe("j", "JS to include at end of <body> element")
  .alias("p", "path")
  .string("p")
  .demandOption("p")
  .describe("p", "Path to your Chrome")
  .alias("s", "size")
  .default("s", "A5")
  .describe("s", "Size of PDF")
  .help()
  .detectLocale(false).argv;

(async () => {
  const md: VFile = vfile.readSync(argv._[0]);
  md.path = path.resolve(md.basename as string);
  const html = await md2html(md, argv.h, { css: argv.c, js: argv.j });
  vfile.writeSync(html);
  await html2lpdf(argv.p, html, argv.s);
})();
