const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

const glob = require('glob')
const minify = require('html-minifier').minify

const publicDir = join(__dirname, 'public')

glob(join(publicDir, '**/*.html'), {}, (er, files) => {
  files.map(file => {
    const content = readFileSync(file, 'utf8')
    const minifiedContent = minify(content, {
      removeComments: true,
      removeCommentsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true
    })
    writeFileSync(file, minifiedContent)
  })
})
