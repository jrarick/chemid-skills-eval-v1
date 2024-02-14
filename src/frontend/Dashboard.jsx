import { useState } from 'react'
import '../css/dashboard.css'

export default function Dashboard() {
	const [file, setFile] = useState(null)
	const [convertedData, setConvertedData] = useState([])

	const uploadFile = async () => {
		const formData = new FormData()
		formData.append('file', file)

		await fetch('http://localhost:8080/api/upload', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((data) => setConvertedData(data))
			.catch((err) => console.error(err))
	}

	return (
		<main className='main-container'>
			<div className='card'>
				<h1 className='card-header'>Dashboard Page</h1>
				<h2 className='card-header'>Upload a .csv file to convert it to JSON</h2>
				<form
					className='card-body'
					onSubmit={(e) => {
						e.preventDefault()
						uploadFile(file)
					}}
				>
					<input
						className='input-file'
						type='file'
						accept='.csv'
						onChange={(e) => setFile(e.target.files[0])}
						required
					/>
					<button type='submit' className='button'>
						Convert File to JSON
					</button>
				</form>
			</div>
			{convertedData.calculated && (
				<div className='json-columns'>
					<div className='json'>
						<h3 className='json-heading'>Original Data</h3>
						<pre>{JSON.stringify(convertedData.original, null, 4)}</pre>
					</div>
					<div className='json'>
						<h3 className='json-heading'>Calculated Data</h3>
						<pre>{JSON.stringify(convertedData.calculated, null, 4)}</pre>
					</div>
				</div>
			)}
		</main>
	)
}
