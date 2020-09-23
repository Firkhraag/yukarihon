import React from 'react'
import AskForm from './AskForm/AskForm'
import exit from '../../assets/images/exit-white.svg'
import './Backdrop.css'

type BackdropProps = {
	isShown: boolean
	isAskFormShown: boolean
	exitClick: () => void
	setPolicyOpened: (isOpened: boolean) => void
}

const Backdrop = ({
	isShown,
	isAskFormShown,
	exitClick,
	setPolicyOpened,
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
				isFormShown={isAskFormShown}
				complete={exitClick}
				setPolicyOpened={setPolicyOpened}
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
