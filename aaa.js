const readline = require('readline')
const fs = require('fs')
const {exec} = require('child_process')

let getUserInput = (input) => {
	const rl = readline.createInterface({
		input:process.stdin,
		output:process.stdout
	})
	return new Promise((resolve,reject) => {
		rl.question('please input a name..\n',answer => {
			rl.close()
			if (!answer){
				getUserInput()
				return
			}
			resolve(answer)
		})
	})
}

let createDir = (name) => {
	exec(`mkdir ${name}`, (error,stdout,stderr) => {
		if (error) {
			console.log(error)
			process.exit()
			return
		}else{
			console.log('The folder was created successfully!👌\n')
			createPackageJson(name)
		}
	})
}

let createPackageJson = (projectName) => {
	const packageJson = JSON.stringify({
		"name":projectName,
		"version":"1.0.0",
		"description":"",
		"main":"index.js",
		"scripts":{
			"test": "echo \"Error: no test specified\" && exit 1"
		},
		"author":"",
		"license":"ISC",
		"dependencies":{
			"react":"^16.8.6",
			"react-dom":"^16.8.6"
		}
	},null,'\t')
	
	let writeStream = fs.createWriteStream(`./${projectName}/package.json`)
	
	writeStream.on('error',(error) => {
		console.log(error)
	})
	writeStream.on('finish',() => {
		exec(`cd ${projectName} && npm install`,(error,stdout,stderr) => {
			console.log('downloading..☕')
			if (error) {
				console.log(error)
				process.exit()
			}else{
				console.log('The project has been created!👌\n')
				process.exit()
			}
		})
	})
	writeStream.write(packageJson)
	writeStream.end()
}

let getDirList = () => {
	let allList = fs.readdirSync(__dirname)
	let dirList = []
	allList.forEach(item => {
		if (fs.statSync(item).isDirectory()) {
			dirList.push(item)
		}
	})
	return dirList
}

let checkExist = (arr,name) => {
	let result = arr.find(v => {
		return v === name
	})
	return result ? true : false
}

let start = function() {
	getUserInput().then((answer) => {
		let dirList = getDirList()
		let dirIsExist = checkExist(dirList,answer)
		if (dirIsExist) {
			console.log(`'${answer}' is already exist, please input a new name 🤔\n`)
			start()
			return
		}
		createDir(answer)
	})
}

start()

