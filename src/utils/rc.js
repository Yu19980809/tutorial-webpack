import fs from 'fs'
import chalk from 'chalk'
import { promisify } from 'util'
import { decode, encode } from 'ini'
import { RC, DEFAULTS } from './constants'

const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// RC 是配置文件
// DEFAULT 是默认的配置
export const get = async key => {
  const isExist = await exists(RC)
  let opts
  if (!isExist) return ''
  opts = await readFile(RC, 'utf8')
  opts = decode(opts)
  return opts[key]
}

export const getAll = async () => {
  const isExist = await exists(RC)
  let opts
  if (!isExist) return {}
  opts = await readFile(RC, 'utf8')
  opts = decode(opts)
  return opts
}

export const set = async (key, value) => {
  const isExist = await exists(RC)
  let opts
  if (!isExist) {
    Object.assign(DEFAULTS, { [key]: value })
  } else {
    opts = await readFile(RC, 'utf8')
    opts = decode(opts)
    if (!key) {
      return console.log(chalk.red(chalk.bold('Error: ')), chalk.red('key is required'))
    }
    if (!value) {
      return console.log(chalk.red(chalk.bold('Error: ')), chalk.red('value is required'))
    }
    Object.assign(opts, { [key]: value })
  }
  await writeFile(RC, encode(opts), 'utf8')
}

export const remove = async key => {
  const isExist = exists(RC)
  let opts
  if (!isExist) return
  opts = await readFile(RC, 'utf8')
  opts = decode(opts)
  delete opts[key]
  await writeFile(RC, encode(opts), 'utf8')
}
