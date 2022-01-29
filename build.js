#!/usr/bin/env node

import { parse, join } from 'path'
import { readdir, mkdir, readFile } from 'fs/promises'
import { fromMarkdown } from 'mdast-util-from-markdown'

const pages = await readdir('pages')

await mkdir('public', { recursive: true })

const aliases = {
  README: {
    template: 'index.html',
    name: 'home'
  }
}
const buildPage = async filename => {
  const { ext, name } = parse(filename)
  const path = join('pages', filename)
  const file = await readFile(path, 'utf8')
  const ast = fromMarkdown(file)
  console.log({ filename, path, ext })
  console.log(ast)

}

await Promise.all(pages.map(buildPage))
