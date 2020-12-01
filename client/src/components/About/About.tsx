import React, { useState, useRef, useEffect } from 'react'
import leftArrow from '../../assets/images/arrow-backward-w.svg'
import rightArrow from '../../assets/images/arrow-forward-w.svg'
import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.jpg'
import img4 from '../../assets/images/4.jpg'
import img5 from '../../assets/images/5.jpg'
import img6 from '../../assets/images/6.jpg'
import img7 from '../../assets/images/7.jpg'
import img8 from '../../assets/images/8.jpg'
import img9 from '../../assets/images/9.jpg'
import img10 from '../../assets/images/10.jpg'
import './About.css'

const About = () => {
	const [width, setWidth] = useState(window.innerWidth)
	const updateWindowDimensions = () => {
		setWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', updateWindowDimensions)
		return () => {
			window.removeEventListener('resize', updateWindowDimensions)
		}
	})

	let arrowsNotNeeded = width < 1080

	const [isStart, setIsStart] = useState(true)
	const scrollRef = useRef()

	const handleRightClick = () => {
		const refCurrent = scrollRef.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: 2000, top: 0, behavior: 'smooth' })
			setIsStart(false)
		}
	}

	const handleLeftClick = () => {
		const refCurrent = scrollRef.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: -2000, top: 0, behavior: 'smooth' })
			setIsStart(true)
		}
	}

	return (
		<div className="container">
			<div className="w-c">
				<div className="wave-cnt" />
				<div className="wave-container relative grad-bg">
					<p className="white desktop-font line-height text-centered ">
						Эксперимент, японистика, встреча единомышленников – это
						«Юкари».
						<br />
						<br />
						Наш проект – крупное образовательное событие по Японии
						эпохи Эдо (1603-1868 гг.). Самураи и ронины, Хокусай и
						хайку, сёгуны и гейши – эти образы сразу всплывают при
						разговоре о традиционной Японии.
						<br />
						<br />
						<strong>
							10 онлайн-лекций от лучших японистов России
						</strong>{' '}
						позволят проникнуть за ширмы императорских дворцов,
						пройтись по многолюдному Эдо, посетить театр Кабуки и
						познакомиться с кварталами любви.
						<br />
						<br />
						После мероприятия мы не бросим вас с этим багажом
						знаний.
						<br />
						<strong>
							Активные участники не только выиграют призы, но и
							получат приглашения в японистические проекты!
						</strong>
						<br />
						<br />
					</p>
					<div className="relative">
						{arrowsNotNeeded ? (
							<div className="hide" />
						) : (
							<div>
								{!isStart ? (
									<img
										src={leftArrow}
										className="gallery-arrow-left pointer"
										onClick={handleLeftClick}
										alt="Левая стрелка"
									/>
								) : (
									<div className="hide" />
								)}
								{isStart ? (
									<img
										src={rightArrow}
										className="gallery-arrow-right pointer"
										onClick={handleRightClick}
										alt="Правая стрелка"
									/>
								) : (
									<div className="hide" />
								)}
							</div>
						)}
						<div className="gallery-cnt-grid" ref={scrollRef}>
							<img className="gallery-img" src={img1} />
							<img className="gallery-img" src={img2} />
							<img className="gallery-img" src={img3} />
							<img className="gallery-img" src={img4} />
							<img className="gallery-img" src={img5} />
							<img className="gallery-img" src={img6} />
							<img className="gallery-img" src={img7} />
							<img className="gallery-img" src={img8} />
							<img className="gallery-img" src={img9} />
							<img className="gallery-img" src={img10} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
