import React, { useState } from 'react'
import AboutProject from './AboutProject'
import emperor from '../../assets/images/emperor.jpg'
import discussionClub from '../../assets/images/discussionclub.jpg'
import tobe from '../../assets/images/tobe.jpg'
import karuta from '../../assets/images/karuta.jpg'
import eiga from '../../assets/images/eiga.jpg'
import culture from '../../assets/images/culture.jpg'
import './AboutWithPhotos.css'

const AboutWithPhotos = () => {
	const defaultState = {
		isShown1: false,
		isShown2: false,
		isShown3: false,
		isShown4: false,
		isShown5: false,
	}
	const [descShownState, setDescShownState] = useState(defaultState)

	const setDescShown = (num: number) => {
		switch (num) {
			case 1:
				setDescShownState({ ...defaultState, isShown1: true })
				break
			case 2:
				setDescShownState({ ...defaultState, isShown2: true })
				break
			case 3:
				setDescShownState({ ...defaultState, isShown3: true })
				break
			case 4:
				setDescShownState({ ...defaultState, isShown4: true })
				break
			case 5:
				setDescShownState({ ...defaultState, isShown5: true })
				break
			default:
				setDescShownState(defaultState)
				break
		}
	}

	return (
		<div className="about-with-p">
			{/* <p className="desktop-font line-height text-centered">
				Год назад мы провели 3-дневную городскую школу японистики,
				посвящённую средневековой Японии. 27 мероприятий, включая лекции, вака-баттл, открытую дискуссию и
				концерт традиционной японской музыки посетили более 300
				участников. По итогам мероприятия студенты и школьники основали 6
				японистических проектов, 2 из которых успешно завершились, а
				остальные 4 работают до сих пор.
			</p> */}
			<p className="desktop-font line-height text-centered">
				Год назад мы провели 3-дневную городскую школу японистики,
				посвящённую средневековой Японии.
				<br />
				<strong>27 мероприятий</strong>, включая лекции, вака-баттл,
				открытую дискуссию и концерт традиционной японской музыки
				посетило более 300 участников.
				<br />
				<br />
				После мероприятия студенты и школьники влились в 5
				японистических проектов:
			</p>
			<div className="about-img-cnt">
				<AboutProject
					img={emperor}
					title="«Повесть об Императоре»"
					desc="Страница ВКонтакте, посвящённая средневековой Японии. Мы освещаем неоднозначные проблемы изучения сёгуната Камакура и Муромати, героев реставрации Кэмму и военачальников Сэнгоку, театр и конфуцианских авторов, буддийских наставников и законодателей Японии XII-XVI веков! Также проводим стримы и публикуем обзоры тематической литературы."
					style="about-img1"
					isDescShown={descShownState.isShown1}
					setDescShown={() => setDescShown(1)}
					setDescClose={() => setDescShown(-1)}
				/>
				<AboutProject
					img={discussionClub}
					title="Научно-дискуссионный клуб по Японии"
					desc="Клуб для обсуждения широкого спектра проблем японистики в целом, а также пространство самореализации как начинающих исследователей Японии, так и опытных японистов. Платформа для дискуссий, докладов и семинаров от студентов!"
					style="about-img2"
					isDescShown={descShownState.isShown2}
					setDescShown={() => setDescShown(2)}
					setDescClose={() => setDescShown(-1)}
				/>
				<AboutProject
					img={karuta}
					title="Московский карута-клуб"
					desc="Кё:ги карута – соревновательная карточная игра, популярная в Японии. Участники встречаются каждые выходные, чтобы совершенствоваться в искусстве сложения строф из строчек великих японских поэтов – в этом и заключается суть игры. Чемпионаты и встречи, дружные единомышленники и карута – добро пожаловать!"
					style="about-img2"
					isDescShown={descShownState.isShown3}
					setDescShown={() => setDescShown(3)}
					setDescClose={() => setDescShown(-1)}
				/>
				<AboutProject
					img={eiga}
					title="Киноклуб «Boku no eiga»"
					desc="Почти домашний киноклуб, по совместительству блог. В нашем объективе японское кино. Встречаемся по пятницам, пьем тёплый чай, смотрим кино и устраиваем обсуждение. Так это было на протяжении 2019-2020 учебного года. Проект завершился, дав почву для глубоких размышлений и оставив тёплые воспоминания."
					style="about-img2"
					isDescShown={descShownState.isShown4}
					setDescShown={() => setDescShown(4)}
					setDescClose={() => setDescShown(-1)}
				/>
				<AboutProject
					img={culture}
					title="Неделя японской культуры в Лицее НИУ ВШЭ"
					desc="Знакомство с традиционными японскими сладостями, совместный просмотр классиков японской анимации и кинематографа, лекция по стереотипам об истории Японии – проект лицеистов НИУ ВШЭ направления «Востоковедение», успешно завершившийся и подаривший бурю эмоций не только организаторам, но и участникам."
					style="about-img2"
					isDescShown={descShownState.isShown5}
					setDescShown={() => setDescShown(5)}
					setDescClose={() => setDescShown(-1)}
				/>
				{/* <AboutProject
                    title="Команда «Юкари»"
                    desc="Начинающие японисты и единомышленники, по уши влюблённые в Японию. В нашем составе студенты и школьники, готовые и шутку пошутить, и крупнейшее образовательное событие по Японии провести."
                /> */}
			</div>
			<p className="desktop-font line-height text-centered">
				<strong>Команда «Юкари»</strong> – начинающие японисты и
				единомышленники, по уши влюблённые в Японию. В нашем составе
				студенты и школьники, готовые и шутку пошутить, и крупнейшее
				образовательное событие по Японии провести.
                <br />
				<br />
                Мы занимаемся организацией лектория, а выступать будут
				преподаватели и сотрудники Института классического Востока и
				Античности НИУ ВШЭ, Школы востоковедения НИУ ВШЭ, Института
				стран Азии и Африки МГУ, Института востоковедения РАН, Института
				восточных рукописей РАН и других учебных и научных учреждений.
			</p>
		</div>
	)
}

export default AboutWithPhotos
