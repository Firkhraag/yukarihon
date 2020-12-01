import React, { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import ResizeObserver from 'resize-observer-polyfill'
import { Link } from 'react-scroll'
import './Faq.css'

type FaqProps = {
	buttonClick: () => void
	openDonateDrawer: () => void
}

const Faq = ({ buttonClick, openDonateDrawer }: FaqProps) => {
	const questionsAnswers = [
		{
			id: 0,
			question: 'Это бесплатно?',
			answer: (
				<div>
					<p className="desktop-font line-height p-bottom-margin">
						Да, это бесплатно.
					</p>
				</div>
			),
		},
		{
			id: 1,
			question: 'Будет ли запись лекций?',
			answer: (
				<div>
					<p className="desktop-font line-height p-bottom-margin">
						Да, полная запись всех лекций будет доступна на нашем
						сайте и на{' '}
						<a href="https://vk.com/yukarium" target="_blank">
							странице ВКонтакте
						</a>
						.
					</p>
				</div>
			),
		},
		{
			id: 2,
			question: 'Зачем тогда участвовать онлайн?',
			answer: (
				<div>
					<ul className="desktop-font line-height">
						<li>
							вы сможете задать вопросы и пообщаться с лучшими
							экспертами по эпохе Эдо в России;
						</li>
						<li>
							интерактивный конкурс проходит в онлайн-формате;
							отвечая на вопросы и выполняя квесты на сайте, вы
							можете выиграть ценные призы;
						</li>
						<li>
							участники онлайн-лектория по итогам события будут
							приглашены на очную встречу; на собрании с
							презентациями выступят японистические проекты, а
							также будут вручены призы за победу в конкурсе.
						</li>
					</ul>
				</div>
			),
		},
		{
			id: 3,
			question: 'Кто проводит мероприятия?',
			answer: (
				<div>
					<p className="desktop-font line-height p-bottom-margin">
						<strong>Команда «Юкари»</strong> – начинающие японисты и
						единомышленники, по уши влюблённые в Японию. В нашем
						составе студенты и школьники, готовые и шутку пошутить,
						и крупнейшее образовательное событие по Японии провести.
						Впервые собранная в 2019 году, наша команда в течение
						учебного года ведёт{' '}
						<a href="https://vk.com/tenno_monogatari">
							просветительские Интернет-страницы
						</a>
						, а также проводит семинары и{' '}
						<a href="https://vk.com/youngjapanconf">
							научные конференции
						</a>
						,{' '}
						<a href="https://vk.com/club191169490">
							дискуссии и доклады
						</a>
						, <a href="https://vk.com/bokunoeiga">кинопоказы</a> и{' '}
						<a href="https://vk.com/wall-153956388_518">
							дегустации японской кухни
						</a>
						.
						<br />
						<br />
						Мы занимаемся организацией лектория, а выступать будут
						преподаватели и сотрудники Института классического
						Востока и Античности НИУ ВШЭ, Школы востоковедения НИУ
						ВШЭ, Института стран Азии и Африки МГУ, Института
						востоковедения РАН, Института восточных рукописей РАН и
						других учебных и научных учреждений.
						<br />
						<br />
						<a
							href="https://vk.com/topic-184996744_39713476"
							target="_blank"
						>
							Подробнее о команде проекта
						</a>
					</p>
				</div>
			),
		},
		{
			id: 4,
			question: 'Как принять участие?',
			answer: (
				<div>
					<p className="desktop-font line-height p-bottom-margin">
						Всё просто! Вы{' '}
						<Link
							className="pointer"
							style={{ color: '#551a8b' }}
							to="register"
							smooth={true}
							offset={-155}
							duration={300}
						>
							регистрируетесь
						</Link>{' '}
						и проверяете почту, а 28-29 ноября входите на сайт и
						подключаетесь к онлайн-лекциям.
					</p>
				</div>
			),
		},
		{
			id: 5,
			question: 'Как поддержать проект?',
			answer: (
				<div>
					<p className="desktop-font line-height p-bottom-margin">
						Мы будем рады как{' '}
						<span
							className="pointer"
							style={{ color: '#551a8b' }}
							onClick={() => console.log('Clicked')}
						>
							добровольным пожертвованиям
						</span>
						, так и рекламе «Юкари» в соцсетях.
					</p>
					<p className="desktop-font line-height p-bottom-margin">
						Лучший способ – репостнуть анонс лектория в ВКонтакте и
						пригласить друзей участвовать в нашем мероприятии.
					</p>
				</div>
			),
		},
	]

	const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
	const [questionOpened, setQuestionOpened] = useState(-1)
	const [isButtonHovered, setButtonHovered] = useState(false)
	const [height0, setHeight0] = useState(0)
	const [height1, setHeight1] = useState(0)
	const [height2, setHeight2] = useState(0)
	const [height3, setHeight3] = useState(0)
	const [height4, setHeight4] = useState(0)
	const [height5, setHeight5] = useState(0)

	useEffect(() => {
		const ro = [
			new ResizeObserver(([entry]) => {
				setHeight0(entry.target.scrollHeight)
			}),
			new ResizeObserver(([entry]) => {
				setHeight1(entry.target.scrollHeight)
			}),
			new ResizeObserver(([entry]) => {
				setHeight2(entry.target.scrollHeight)
			}),
			new ResizeObserver(([entry]) => {
				setHeight3(entry.target.scrollHeight)
			}),
			new ResizeObserver(([entry]) => {
				setHeight4(entry.target.scrollHeight)
			}),
			new ResizeObserver(([entry]) => {
				setHeight5(entry.target.scrollHeight)
			}),
		]

		refs.forEach((ref, i) => {
			if (ref.current) {
				ro[i].observe(ref.current)
			}
		})

		return () => {
			ro.forEach((r) => r.disconnect())
		}
	}, [refs])

	const propsArray = [
		useSpring({
			from: { opacity: 0 as any, height: 0 },
			to: {
				opacity: questionOpened === 0 ? 1 : (0 as any),
				height: questionOpened === 0 ? height0 : 0,
			},
		}),
		useSpring({
			from: { opacity: 0 as any, height: 0 },
			to: {
				opacity: questionOpened === 1 ? 1 : (0 as any),
				height: questionOpened === 1 ? height1 : 0,
			},
		}),
		useSpring({
			from: { opacity: 0 as any, height: 0 },
			to: {
				opacity: questionOpened === 2 ? 1 : (0 as any),
				height: questionOpened === 2 ? height2 : 0,
			},
		}),
		useSpring({
			from: { opacity: 0 as any, height: 0 },
			to: {
				opacity: questionOpened === 3 ? 1 : (0 as any),
				height: questionOpened === 3 ? height3 : 0,
			},
		}),
		useSpring({
			from: { opacity: 0 as any, height: 0 },
			to: {
				opacity: questionOpened === 4 ? 1 : (0 as any),
				height: questionOpened === 4 ? height4 : 0,
			},
		}),
		useSpring({
			from: { opacity: 0 as any, height: 0 },
			to: {
				opacity: questionOpened === 5 ? 1 : (0 as any),
				height: questionOpened === 5 ? height5 : 0,
			},
		}),
	]

	const hoveredContactProps = useSpring({
		from: { left: isButtonHovered ? '-150%' : '50%' },
		to: { left: isButtonHovered ? '50%' : '-150%' },
		config: {
			duration: 220,
		},
	})

	const notHoveredContactProps = useSpring({
		from: { left: isButtonHovered ? '0%' : '150%' },
		to: { left: isButtonHovered ? '150%' : '0%' },
		config: {
			duration: 220,
		},
	})

	const handleQuestionClick = (questionNum: number) => {
		if (questionOpened === questionNum) {
			setQuestionOpened(-1)
		} else {
			setQuestionOpened(questionNum)
		}
	}

	const getQuestionStyle = (questionNum: number) =>
		questionNum === questionOpened
			? 'question-opened question pointer'
			: 'pointer question'

	const createQuestionAnswer = (questionNum: number) => {
		return (
			<div>
				<p
					onClick={() => handleQuestionClick(questionNum)}
					className={getQuestionStyle(questionNum)}
				>
					{questionsAnswers[questionNum].question}
				</p>
				<animated.div
					className="answer"
					style={propsArray[questionNum]}
				>
					<div ref={refs[questionNum]}>
						{questionsAnswers[questionNum].answer}
					</div>
				</animated.div>
			</div>
		)
	}

	const contactButtonText = () => {
		return (
			<div className="relative">
				<animated.div
					style={hoveredContactProps}
					className="absolute ask-question-text"
				>
					Задайте свой вопрос!
				</animated.div>
				<animated.div
					style={notHoveredContactProps}
					className="relative"
				>
					Не нашли нужный ответ?
				</animated.div>
			</div>
		)
	}

	return (
		<div className="padded-container faq-container margin-from-prev-comp">
			<h1 className="text-centered">Часто задаваемые вопросы</h1>
			{createQuestionAnswer(0)}
			<hr />
			{createQuestionAnswer(1)}
			<hr />
			{createQuestionAnswer(2)}
			<hr />
			{createQuestionAnswer(3)}
			<hr />
			{createQuestionAnswer(4)}
			<hr />
			<div>
				<p
					onClick={() => handleQuestionClick(5)}
					className={getQuestionStyle(5)}
				>
					{questionsAnswers[5].question}
				</p>
				<animated.div className="answer" style={propsArray[5]}>
					<div ref={refs[5]}>
						<div>
							<p className="desktop-font line-height p-bottom-margin">
								Мы будем рады как{' '}
								<span
									className="pointer"
									style={{ color: '#551a8b' }}
									onClick={() => {
										setTimeout(() => openDonateDrawer(), 50)
									}}
								>
									добровольным пожертвованиям
								</span>
								, так и рекламе «Юкари» в соцсетях.
							</p>
							<p className="desktop-font line-height p-bottom-margin">
								Лучший способ – репостнуть анонс лектория в
								ВКонтакте и пригласить друзей участвовать в
								нашем мероприятии.
							</p>
						</div>
					</div>
				</animated.div>
			</div>
			<hr />
			{/* <div className="contact-us-cnt">
				<div
					className="contact-us text-centered pointer"
					onMouseEnter={() => setButtonHovered(true)}
					onMouseLeave={() => setButtonHovered(false)}
					onClick={buttonClick}
				>
					{contactButtonText()}
				</div>
			</div> */}
		</div>
	)
}

export default Faq
