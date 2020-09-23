import React, { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import ResizeObserver from 'resize-observer-polyfill'
import './Faq.css'

const questionsAnswers = [
	{
		id: 0,
		question: 'Это бесплатно?',
		answer: (
			<div>
				<p className="desktop-font line-height p-bottom-margin">Да</p>
			</div>
		),
	},
	{
		id: 1,
		question: 'Будет ли запись лекций?',
		answer: (
			<div>
				<p className="desktop-font line-height p-bottom-margin">
					Да, полная запись всех лекций будет доступна на нашем сайте
					и на <a href="https://vk.com/yukarium" target="_blank">странице в ВКонтакте</a>.
				</p>
			</div>
		),
	},
	{
		id: 2,
		question: 'Зачем тогда участвовать онлайн?',
		answer: (
			<div>
				<p className="desktop-font line-height p-bottom-margin">
					Во-первых, вы сможете задать вопросы и пообщаться по теме с
					лучшими экспертами по эпохе Эдо в России.
				</p>
				<p className="desktop-font line-height p-bottom-margin">
					Во-вторых, интерактивный конкурс проходит в онлайн-формате.
					Отвечая на вопросы и выполняя квесты на сайте, вы можете
					выиграть замечательные призы.
				</p>
				<p className="desktop-font line-height p-bottom-margin">
					В третьих, только участники онлайн-лектория будут приглашены
					на очную встречу по итогам проведённого события. На собрании
					с презентациями выступят японистические проекты, а также
					будут вручены призы за победу в конкурсе.
				</p>
			</div>
		),
	},
	{
		id: 3,
		question: 'Кто проводит мероприятия?',
		answer: (
			<div>
				<p className="desktop-font line-height p-bottom-margin">
					Команда «Юкари» – начинающие японисты и просто группа
					единомышленников, по уши влюблённых в Японию. В нашем
					составе пассионарные студенты и школьники, готовые и шутку
					пошутить, и крупнейшее образовательное событие по Японии
					провести. Впервые собранная в 2019 году, наша команда в
					течение учебного года ведёт просветительские
					Интернет-страницы, а также проводит семинары и научные
					конференции, дискуссии и доклады, кинопоказы и даже
					дегустации японской кухни.
				</p>
				<p className="desktop-font line-height p-bottom-margin">
					Мы занимаемся организацией лектория, выступать же будут
					преподаватели Института классического Востока и Античности
					НИУ ВШЭ, Школы Востоковедения НИУ ВШЭ, Института Стран Азии
					и Африки МГУ, Института Востоковедения РАН, Института
					восточных рукописей РАН и других учебных заведений.
				</p>
				<p className="desktop-font line-height p-bottom-margin">
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
					Всё просто! Вы регистрируетесь и проверяете почту, а 28-29
					ноября входите в аккаунт на сайте и подключаетесь к
					онлайн-лекциям. Отвечать на вопросы и решать квесты смогут
					только зарегистрированные пользователи, так что поспешите.
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
					Мы будем рады как добровольным пожертвованиям, так и рекламе
					«Юкари» в соцсетях.
				</p>
				<p className="desktop-font line-height p-bottom-margin">
					Лучший способ – репостнуть анонс лектория в ВКонтакте и
					пригласить друзей участвовать в нашем мероприятии.
				</p>
			</div>
		),
	},
]

type FaqProps = {
	buttonClick: () => void
}

const Faq = ({ buttonClick }: FaqProps) => {
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
			{createQuestionAnswer(5)}
			<hr />
			<div className="contact-us-cnt">
				<div
					className="contact-us text-centered pointer"
					onMouseEnter={() => setButtonHovered(true)}
					onMouseLeave={() => setButtonHovered(false)}
					onClick={buttonClick}
				>
					{contactButtonText()}
				</div>
			</div>
		</div>
	)
}

export default Faq
