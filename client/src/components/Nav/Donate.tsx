import React, { useState } from 'react'
import DonateIcon from './DonateIcon'

type DonateProps = {
	setDonateDrawerOpen: (isOpen: boolean) => void
	isDesktop: boolean
}

const Donate = ({ setDonateDrawerOpen, isDesktop }: DonateProps) => {
	const [donateIconHoverd, setDonateIconHovered] = useState(false)

	return (
		<div
			onClick={() => setDonateDrawerOpen(true)}
			className="pointer"
			onMouseEnter={() => setDonateIconHovered(true)}
			onMouseLeave={() => setDonateIconHovered(false)}
		>
			{isDesktop ? (
				<DonateIcon fill={donateIconHoverd ? '#7e4399' : '#000'} />
			) : (
				<DonateIcon fill={'#000'} />
			)}
		</div>
	)
}

export default Donate
