import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Policy from './components/Policy/Policy'
import Root from './Root'
import { CardStatesProvider } from './store/CardStatesStore'
import { WindowPropertiesProvider } from './store/WindowPropertiesStore'
import './App.css'

const App = () => {

	return (
		<WindowPropertiesProvider>
			<CardStatesProvider>
				<Router>
					<Routes>
                        <Route path="/" element={<Root />} />
						<Route path="/policy" element={<Policy />} />
					</Routes>
				</Router>
			</CardStatesProvider>
		</WindowPropertiesProvider>
	)
}

export default App
