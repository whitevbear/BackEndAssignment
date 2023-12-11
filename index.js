// index.js

const express = require('express')
const path = require('path')
//這裡引入了兩個 Node.js 模組。express 是一個流行的 Web 框架，用於建立 Web 應用程式。path 模組則提供了處理文件路徑的功能。
const app = express()
//這行程式碼建立了一個 Express 應用程式的實例，我們將使用這個實例配置和定義我們的 Web 應用程式。
const PORT = 3000
//意味著這個伺服器應該在端口號 3000 上監聽請求。當伺服器啟動後，使用者就可以透過瀏覽器或其他工具，向 http://localhost:3000 發送請求，以訪問這個伺服器上的內容。

app.use(express.json())
////這行程式碼告訴 Express 應用程式在處理請求時使用 JSON 解析中介軟體，這使得我們能夠方便地處理發送過來的 JSON 格式的請求。

app.get("/answer", (req, res) => {
	const targetNumber=RandomNumber();
	console.log("answer: " + targetNumber);
    res.send({ answer: [targetNumber] });
})

app.get('*', (req, res) => {
	res.status(404).json({ error: 'Page did not exist' })
})
////這段程式碼定義了一個處理所有 GET 請求的路由。它會回傳一個 JSON 物件，其中包含一個錯誤訊息，表示頁面不存在。這是一個簡單的 404 頁面。

app.use((err, req, res, next) => {
	const status = err.status || 500
	if (status === 500) {
		console.log('The server errored when processing a request')
		console.log(err)
	}

	res.status(status)
	res.send({
		status: status,
		message: err.message,
	})
})
////這是一個錯誤處理的中介軟體。當應用程式內的其他地方出現錯誤並拋出時，這個中介軟體會被呼叫來處理錯誤。它會回傳一個包含錯誤訊息的 JSON 物件。

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
//最後，這行程式碼啟動了 Express 應用程式，使其監聽在指定的端口（在這裡是 3000）。當伺服器啟動後，會在控制台中輸出一條訊息。



/*// Random number 1.0
function RandomNumber(){
const targetNumber = Math.floor(Math.random() * 100) + 1;
console.log("answer: " + targetNumber);}*/


function RandomNumber(){
	return Math.floor(Math.random() * 100) + 1;
	}
	////targetNumber 是在 RandomNumber 函式內部的區域變數，無法在 app.get 的回應函式中直接訪問。要解決這個問題，你可以將 RandomNumber 函式的結果作為返回值。

const mongoose = require('mongoose')
//引入 Mongoose 模組，這是一個 MongoDB 的物件模型工具，用來在 Node.js 中與 MongoDB 進行互動。

require('dotenv').config()
//引入 dotenv 模組，用於讀取 .env 檔案中的環境變數。這樣你就能夠在 .env 中儲存敏感資訊，而不需要將其硬編碼在程式碼中。
	
const uri = process.env.MONGO_URI
////從環境變數中讀取 MongoDB 的連接字串。在 .env 檔案中，你應該有一行類似 MONGO_URI=mongodb://your-mongodb-uri 的設定。
const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
}// 定義連接 MongoDB 時的選項。這裡的選項包括使用新的 URL 解析器 (useNewUrlParser: true) 和使用統一的拓撲學 (useUnifiedTopology: true)。
	
// 連接到 MongoDB
mongoose
	.connect(uri, options)// 使用 Mongoose 的 connect 方法連接到 MongoDB。uri 是 MongoDB 的連接字串，而 options 是連接的選項。
	.then(() => {
		console.log('MongoDB is connected')
})//如果連接成功，則在控制台中輸出 "MongoDB is connected"。
	.catch((err) => {
		console.log(err)
})//如果連接失敗，則捕捉錯誤，並在控制台中輸出錯誤訊息。
	