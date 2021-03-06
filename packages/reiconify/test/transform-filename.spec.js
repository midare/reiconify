const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const rimraf = require('rimraf')
const {transform} = require('..')

describe('transform-filename', () => {
  const orignalCwd = process.cwd()
  const cwd = path.resolve(__dirname, 'fixtures/transform-filename')
  const srcDir = path.resolve(cwd, 'src')
  const cleanup = async () => {
    await promisify(rimraf)(srcDir)
  }

  beforeAll(() => {
    process.chdir(cwd)
  })

  afterEach(async () => {
    await cleanup()
  })

  afterAll(() => {
    process.chdir(orignalCwd)
  })

  it('transforms icons', async () => {
    await transform({
      inputs: 'icons/*.svg',
      src: true,
      srcDir,
    })

    const files = await promisify(fs.readdir)(srcDir)
    expect(files).toMatchSnapshot()
  })
})
