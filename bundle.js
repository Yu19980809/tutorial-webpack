const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

// 获取一个模块的依赖和转换后的代码
const getModuleInfo = file => {
  // 1. 读取文件内容
  const body = fs.readFileSync(file, 'utf-8')
  // 2. 将读取的文件内容转换为 AST
  const ast = parser.parse(body, {
    sourceType: 'module'  // 表示要解析的是 ES 模块
  })
  // 3. 遍历 AST，收集依赖
  const deps = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
    }
  })
  // 4. ES6 转为 ES5
  const {code} = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  // 返回文件相关信息
  const moduleInfo = {file, deps, code}
  return moduleInfo
}

// 解析模块
const parseModules = file => {
  const entry = getModuleInfo(file)
  let temp = [entry]
  const len = temp.length
  let depsGraph = {}

  for (let i = 0; i < len; i++) {
    const deps = temp[i].deps
    if (!deps) return
    // 递归获取依赖
    for (const key in deps) {
      if (deps.hasOwnProperty(key)) {
        temp.push(getModuleInfo(deps[key]))
      }
    } 
  }

  // 转换一下数据格式
  temp.forEach(moduleInfo => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code
    }
  })

  return depsGraph
}

// 输出内容
const bundle = file => {
  const depsGraph = JSON.stringify(parseModules(file))
  return `;(function (graph) {
    function require(file) {
      function absRequire(relPath) {
        return require(graph[file].deps[relPath])
      }
      var exports = {}
      ;(function (require, exports, code) {
        eval(code)
      })(absRequire, exports, graph[file].code)
      return exports
    }
    require('${file}')
  })(${depsGraph})`
}

// 写入文件
const content = bundle('./src/index.js')
fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content)
