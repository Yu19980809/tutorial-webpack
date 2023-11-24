import inquirer from 'inquirer'
import ora from 'ora'
import fs from 'fs'
import chalk from 'chalk'
import symbol from 'log-symbols'
import { downloadLocal } from './utils/get'

let init = async (templateName, projectName) => {
  // 项目已存在，进行提示
  if (fs.existsSync(projectName)) {
     return console.log(symbol.error, chalk.red('The project already exists'))
  }

  // 命令行交互
  inquirer.prompt([
    {
      name: 'description',
      message: 'Please enter the project description: '
    },
    {
      name: 'author',
      message: 'Please enter the author name: '
    }
  ]).then(async answer => {
    // 下载模板，选择模板
    // 通过配置文件，获取模板信息
    let loading = ora('downloading template...')
    loading.start()
    downloadLocal(templateName, projectName).then(() => {
      loading.succeed()
      const fileName = `${projectName}/package.json`
      if (fs.existsSync(fileName)) {
        const {author, description} = answer
        const data = fs.readFileSync(fileName).toString()
        let json = JSON.parse(data)
        json.name = projectName
        json.author = author
        json.description = description
        // 修改项目文件夹中的 package.json 文件
        fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8')
        console.log(symbol.success, chalk.green('Project initialization finished'))
      }
    }, () => {
      loading.fail()
    })
  })
}

module.exports = init
