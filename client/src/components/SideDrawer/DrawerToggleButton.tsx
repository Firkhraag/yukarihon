import React from 'react'
import './DrawerToggleButton.css'

const DrawerToggleButton = () => {
	return (
		<div className="toggle-button pointer flex-column">
			<div className="toggle-button-line v-line" />
			<div className="toggle-button-line vb-line" />
			<div className="toggle-button-line b-line" />
		</div>
	)
}

export default DrawerToggleButton
