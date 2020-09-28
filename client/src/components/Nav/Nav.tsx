import React, { useContext } from 'react'
import { Link, animateScroll as scroll } from 'react-scroll'
import logo from '../../assets/images/logo.svg'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import Donate from './Donate'
import { WindowPropertiesContext } from '../../store/WindowPropertiesStore'
import './Nav.css'

type NavProps = {
	drawerToggleClickHandler: () => void
	setDonateDrawerOpen: (isOpen: boolean) => void
}

const Nav = ({ drawerToggleClickHandler, setDonateDrawerOpen }: NavProps) => {
	const [windowProperties, _] = useContext(WindowPropertiesContext)

	let headerStyle = 'sticky white-bg full-width flex-centered-vert'
	if (!windowProperties.navVisible) {
		headerStyle = 'header-hidden white-bg full-width flex-centered-vert'
	}

	return (
		<header className={headerStyle}>
			<a onClick={() => scroll.scrollToTop({ duration: 500 })}>
				<img src={logo} alt="Лого" className="nav-logo pointer" />
			</a>
			<nav>
				<div className="toggle-btn">
					<Donate
						setDonateDrawerOpen={setDonateDrawerOpen}
					/>
					<div onClick={drawerToggleClickHandler} style={{marginRight: '.5em'}}>
						<DrawerToggleButton />
					</div>
				</div>
				<ul>
					<Link
						to="about"
						smooth={true}
						offset={80}
						duration={500}
					>
						<li className="pointer">Лекторий</li>
					</Link>
					<Link
						to="about_team"
						smooth={true}
						offset={-225}
						duration={500}
					>
						<li className="pointer">Команда</li>
					</Link>
					<Link
						to="register"
						smooth={true}
						offset={-155}
						duration={500}
					>
						<li className="pointer">Регистрация</li>
					</Link>
					<Link
						to="faq"
						smooth={true}
						offset={-100}
						duration={500}
					>
						<li className="pointer">F.A.Q.</li>
					</Link>
					<a onClick={() => scroll.scrollToBottom({ duration: 800 })}>
						<li className="pointer">Контакты</li>
					</a>
                    <div style={{marginRight: ".33em"}}>
					<Donate
						setDonateDrawerOpen={setDonateDrawerOpen}
					/>
                    </div>
				</ul>
			</nav>
		</header>
	)
}

export default Nav
