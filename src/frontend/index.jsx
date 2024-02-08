import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '../css/index.css'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/dashboard' element={<Dashboard />} />
		</Routes>
	</BrowserRouter>
)
