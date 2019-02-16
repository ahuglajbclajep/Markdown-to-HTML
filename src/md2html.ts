#!/usr/bin/env node

import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import doc from "rehype-document";
import stringify from "rehype-stringify";
import { VFile } from "vfile";
import vfile from "to-vfile";

async function md2html(markdown: VFile): Promise<VFile> {
  const html = await unified()
    .use(parse)
    .use(mutate)
    .use(doc)
    .use(stringify)
    .process(markdown);
  html.extname = ".html";
  return html;
}

vfile
  .read(process.argv[2])
  .then((md: VFile) => md2html(md))
  .then((html: VFile) => vfile.write(html));
