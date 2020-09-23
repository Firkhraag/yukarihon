import React, { useState } from 'react'
import { Img } from 'react-image'
import { Link } from 'react-scroll'
import logoHome from '../../assets/images/hito-roof.svg'
import Spinner from '../Spinner/Spinner'
import './Home.css'

const Home = () => {
	const [buttonHovered, setButtonHovered] = useState(false)

	let spanStyles = 'hide'
	if (buttonHovered) {
		spanStyles = 'show'
	}

	return (
		<div className="container padded-container home-cnt text-centered">
			<Img
				src={logoHome}
				className="logo-home"
				loader={<Spinner where="home" />}
			/>
			<h1 className="head">Юкари</h1>
			<h1 className="head2">однажды в Эдо</h1>
			<p className="subhead">японский лекторий</p>
			<p className="subhead">28–29 ноября 2020</p>
			<Link
				className="text-centered pointer bold"
				to="lectorium"
				smooth={true}
				offset={-150}
				duration={500}
				onMouseEnter={() => setButtonHovered(true)}
				onMouseLeave={() => setButtonHovered(false)}
			>
				<span className={spanStyles}></span>
				<span className={spanStyles}></span>
				<span className={spanStyles}></span>
				<span className={spanStyles}></span>
				Подробнее
			</Link>
			<div className="mousey">
				<div />
			</div>
		</div>
	)
}

export default Home
