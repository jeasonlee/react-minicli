# 面试题

> 现在有一个aaa.js文件，它里面有如下操作，从终端提示用户输入一项目名，然后读取下，在当前目录下，创建这目录，并且生成一个package.json,里面有两个依赖。要通过npm i安装react react-dom;最后终端通知你安装完毕。 只允许用户执行一次node aaa与输入项目名，完成这些操作



> 分解一下题目有如下要求：

1. 获取用户终端输入
2. 创建用户输入文件夹
3. 生成 `package.json` 文件
4. `npm i`  安装 `react` 以及 `react-dom`
5. 通知用户依赖安装完成

> 获取用户终端输入的方法有:

1. `fs.readSync` + `process.stdin`  来完成
2. `readline.question`

> 创建文件夹

使用 `mkdir xxx` 创建文件夹

```javascript
exec('mkdir xxx',(error,stdout,stderr)=>{})
```

创建文件夹的时候需要判断文件夹是否存在

> 生成 `package.json`

可以使用 `npm init` 或者`fs.writeFileSync` 来生成

> 安装依赖

```javascript
exec('npm install',(error,stdout,stderr)=>{})	
```

> 通知用户依赖安装完成

`exec` 会在`npm install` 执行完成之后执行会调,`console.log('依赖安装完成')`



