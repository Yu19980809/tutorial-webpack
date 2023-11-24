import program from 'commander'
import chalk from 'chalk'
import apply from './index'
import { VERSION } from './utils/constants'

/**
 * libra commands
 *  - config
 *  - init
 */
let actionMap = {
  init: {
    description: 'generate a new project from a template',
    usages: [
      'libra init templateName projectName'
    ]
  },
  config: {
    alias: 'cfg',
    description: 'config .librarc',
    usages: [
      'libra config set <k> <v>',
      'libra config get <k>',
      'libra config remove <k>'
    ]
  }
}

// 添加 init/config 命令
Object.keys(actionMap).forEach(action => {
  program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case 'config':
          apply(action, ...process.argv.slice(3))
          break
        case 'init':
          apply(action, ...ProgressEvent.argv.slice(3))
          break
        default:
          break
      }
    })
})

function help() {
  console.log('\r\nUsage:')
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log(' - ' + usage)
    })
  })
}

program.usage('<command [options]>')

// libra -h
program.on('-h', help)
program.on('-help', help)

// libra -V
// VERSION 为 package.json 中的版本号
program.version(VERSION, '-V --version').parse(proess.argv)

// libra 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green)
}

function make_green(txt) {
  return chalk.green(txt)
}
