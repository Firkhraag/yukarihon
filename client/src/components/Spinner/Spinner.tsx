import React from 'react'

import './Spinner.css'

type SpinnerProps = {
	where: string
}

const Spinner = ({ where }: SpinnerProps) => {
	let spinnerStyle = 'spinner container relative spinner-home'
	if (where === 'ev-card') {
		spinnerStyle = 'container relative spinner-ev-card'
	} else if (where === 'ev') {
		spinnerStyle = 'container relative spinner-ev'
	} else if (where === 'finish') {
		spinnerStyle = 'container relative spinner-finish'
	}
	return <div className={spinnerStyle} />
}

export default Spinner
