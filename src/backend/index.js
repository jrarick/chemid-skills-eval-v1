const express = require('express')
const port = 8080
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const csv = require('csv-parser')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.listen(port, () => {
	console.log('-----------------------------------')
	console.log(`SERVER STARTED AND LISTENING ON PORT ${port}`)
})

app.post('/api/upload', cors(), upload.single('file'), (req, res) => {
	const results = []
	let calculatedResults = []

	function convertToNumber(str) {
		const match = str.match(/\d+(\.\d+)?/);
		return match ? Number(match[0]) : null;
	}

	fs.createReadStream(req.file.path)
		.pipe(csv())
		.on('data', (data) => results.push(data))
		.on('end', () => {
			calculatedResults = JSON.parse(JSON.stringify(results))

			calculatedResults.forEach(result => {
				result.Density = convertToNumber(result.Mass) / convertToNumber(result.Volume)

				delete result.Mass
				delete result.Volume
			})

			res.json({ original: results, calculated: calculatedResults})
		})
})