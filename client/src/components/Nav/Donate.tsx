import React, { useState } from 'react'
import DonateIcon from './DonateIcon'

type DonateProps = {
	setDonateDrawerOpen: (isOpen: boolean) => void
}

const Donate = ({ setDonateDrawerOpen }: DonateProps) => {
	const [donateIconHoverd, setDonateIconHovered] = useState(false)

	return (
		<div
			onClick={() => setDonateDrawerOpen(true)}
			className="pointer"
			onMouseEnter={() => setDonateIconHovered(true)}
            onMouseLeave={() => setDonateIconHovered(false)}
            onBlur={() => setDonateIconHovered(false)}
		>
			<DonateIcon fill={donateIconHoverd ? '#7e4399' : '#000'} />
		</div>
	)
}

export default Donate
