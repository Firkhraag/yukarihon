import React, { useContext, useRef, useState } from 'react'
import { useSpring, useChain, animated } from 'react-spring'
import Img from 'react-image'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import { CardStatesContext } from '../../store/CardStatesStore'
import calendar from '../../assets/images/calendar.svg'
import Event from './Event'
import './Events.css'

const Events = () => {
	const [eventProperties, setDay] = useContext(CardStatesContext)

	const checkEventSignValid = () => {
		const filteredArr = eventProperties.checkedCards.map((day) =>
			day.filter((ev) => ev === 0 || ev === 1 || ev === 2)
		)
		if (
			filteredArr[0].length !== 0 ||
			filteredArr[1].length !== 0 ||
			filteredArr[2].length !== 0
		) {
			return true
		} else {
			return false
		}
	}

	const transRef1 = useRef()
	const transRef2 = useRef()
	const transRef3 = useRef()

	useChain(
		eventProperties.day === 0
			? [transRef2, transRef3, transRef1]
			: eventProperties.day === 1
			? [transRef1, transRef3, transRef2]
			: [transRef2, transRef1, transRef3],
		[0, 0, 0.2]
	)

	let firstDayStyle = 'events-header pointer container'
	if (eventProperties.day === 0) {
		firstDayStyle += ' violet-bg white'
	}
	let secondDayStyle = 'events-header pointer container'
	if (eventProperties.day === 1) {
		secondDayStyle += ' grad-bg white'
	}
	let thirdDayStyle = 'events-header pointer container'
	if (eventProperties.day === 2) {
		thirdDayStyle += ' blue-bg white'
	}

	const props = useSpring({
		config: {
			duration:
				eventProperties.day === -1 && !checkEventSignValid() ? 300 : 1,
		},
		from: {
			opacity: 0 as any,
			transform: 'scale(0)' as any,
			position: 'absolute' as any,
		},
		to: {
			opacity:
				eventProperties.day === -1 && !checkEventSignValid()
					? 1
					: (0 as any),
			transform:
				eventProperties.day === -1 && !checkEventSignValid()
					? 'scale(1)'
					: ('scale(0)' as any),
			position:
				eventProperties.day === -1 && !checkEventSignValid()
					? 'static'
					: ('absolute' as any),
		},
	})

	return (
		<div className="relative overflow-hidden full-width margin-from-prev-comp">
			<h1 className="register-header text-centered">Информация</h1>
			<h2 className="register-sub-header text-centered">
				о прошедшем мероприятии
			</h2>
			<animated.div style={props}>
				<h2
					className="text-centered padded-container"
					style={{ marginBottom: '.75em' }}
				>
					Выберите мероприятия
				</h2>
			</animated.div>
			<div className="flex ev-cards-headers">
				<div className={firstDayStyle} onClick={() => setDay(0)}>
					<h2 className="text-centered">27 Октября</h2>
				</div>
				<div className={secondDayStyle} onClick={() => setDay(1)}>
					<h2 className="text-centered">2 Ноября</h2>
				</div>
				<div className={thirdDayStyle} onClick={() => setDay(2)}>
					<h2 className="text-centered">3 Ноября</h2>
				</div>
			</div>
			<Event dayNum={0} transRef={transRef1} />
			<Event dayNum={1} transRef={transRef2} />
			<Event dayNum={2} transRef={transRef3} />
		</div>
	)
}

export default Events
