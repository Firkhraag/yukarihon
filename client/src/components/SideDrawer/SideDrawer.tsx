import React from 'react'
import { Link, animateScroll as scroll } from 'react-scroll'
import ExitButton from './ExitButton'
import './SideDrawer.css'

type SideDrawerProps = {
	closeButtonClick: () => void
	isShown: boolean
}

const SideDrawer = ({ closeButtonClick, isShown }: SideDrawerProps) => {
	let drawerClasses = 'side-drawer white-bg sticky'
	if (isShown) {
		drawerClasses = 'side-drawer white-bg sticky open'
	}
	return (
		<div className={drawerClasses}>
			<ExitButton closeButtonClick={closeButtonClick} />
			<ul className="flex-column">
				<a
					onClick={() => {
						scroll.scrollToTop({ duration: 500 })
						closeButtonClick()
					}}
				>
					<li className="pointer">Главная</li>
				</a>

                <Link
					to="about"
					smooth={true}
					offset={10}
					duration={500}
					onClick={closeButtonClick}
				>
					<li className="pointer">Лекторий</li>
				</Link>
				<Link
					to="about_team"
					smooth={true}
					offset={-100}
					duration={500}
					onClick={closeButtonClick}
				>
					<li className="pointer">Команда</li>
				</Link>
				<Link
					to="register"
					smooth={true}
					offset={-133}
					duration={500}
					onClick={closeButtonClick}
				>
					<li className="pointer">Регистрация</li>
				</Link>
				<Link
					to="faq"
					smooth={true}
					offset={-100}
					duration={500}
					onClick={closeButtonClick}
				>
					<li className="pointer">F.A.Q.</li>
				</Link>
				<a
					onClick={() => {
						scroll.scrollToBottom({ duration: 800 })
						closeButtonClick()
					}}
				>
					<li className="pointer">Контакты</li>
				</a>
			</ul>
		</div>
	)
}

export default SideDrawer
