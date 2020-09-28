import React from 'react'
import AskForm from './AskForm/AskForm'
import exit from '../../assets/images/exit-white.svg'
import './Backdrop.css'

type BackdropProps = {
	isShown: boolean
	isAskFormShown: boolean
	exitClick: () => void
}

const Backdrop = ({
	isShown,
	isAskFormShown,
	exitClick,
}: BackdropProps) => {
	let backdropClasses = 'hide'
	if (isShown) {
		backdropClasses = 'backdrop sticky show'
	}

	const onClick = (event: any) => {
		if (event.target === event.currentTarget) {
			exitClick()
		}
	}

	return (
		<div className={backdropClasses} onMouseDown={onClick}>
			<AskForm
				isShown={isAskFormShown}
				exit={exitClick}
			/>
			<img
				className="close-backdrop pointer"
				src={exit}
				alt="Выйти"
				onClick={exitClick}
			/>
		</div>
	)
}

export default Backdrop
