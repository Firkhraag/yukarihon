import React, { useState, useRef, useEffect } from 'react'

import PartnerCard from './PartnerCard'
import leftArrow from '../../assets/images/arrow-backward.svg'
import rightArrow from '../../assets/images/arrow-forward.svg'
import hseBlue from '../../assets/images/hse-blue.svg'
import cultureCenter from '../../assets/images/culture_center.jpg'
import association from '../../assets/images/association.jpg'
import japFound from '../../assets/images/japfound.png'
import ikvia from '../../assets/images/ikvia.svg'
import school from '../../assets/images/school.jpg'
import isaa from '../../assets/images/isaa.jpg'
import institute from '../../assets/images/institute.jpg'
import manuscript from '../../assets/images/manuscript.png'
import orientalst from '../../assets/images/orientalst.jpg'
import seiran from '../../assets/images/seiran.svg'
import emperor from '../../assets/images/emperor.jpg'
import sengoku1 from '../../assets/images/sengoku1.jpg'
import sengoku2 from '../../assets/images/sengoku2.jpg'

import samurai from '../../assets/images/samurai.jpg'
import musubi from '../../assets/images/musubi.jpg'
import discussionClub from '../../assets/images/discussionclub.jpg'
import clubMsu from '../../assets/images/clubmsu.jpg'
import clubRtu from '../../assets/images/clubrtu.jpg'
import clubMgimo from '../../assets/images/clubmgimo.jpg'
import oriental from '../../assets/images/oriental.jpg'
import sakura from '../../assets/images/sakura.jpg'
import './Partners.css'

const Partners = () => {
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

	// let arrowsNotNeeded = width < 1080 || width > 1500
	let arrowsNotNeeded = width < 1080

	const [isStart1, setIsStart1] = useState(true)
	const [isStart2, setIsStart2] = useState(true)
	const [isStart3, setIsStart3] = useState(true)

	const scrollRef1 = useRef()
	const scrollRef2 = useRef()
	const scrollRef3 = useRef()

	const handleRightClick1 = () => {
		const refCurrent = scrollRef1.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: 2000, top: 0, behavior: 'smooth' })
			setIsStart1(false)
		}
	}

	const handleLeftClick1 = () => {
		const refCurrent = scrollRef1.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: -2000, top: 0, behavior: 'smooth' })
			setIsStart1(true)
		}
	}

	const handleRightClick2 = () => {
		const refCurrent = scrollRef2.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: 2000, top: 0, behavior: 'smooth' })
			setIsStart2(false)
		}
	}

	const handleLeftClick2 = () => {
		const refCurrent = scrollRef2.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: -2000, top: 0, behavior: 'smooth' })
			setIsStart2(true)
		}
	}

	const handleRightClick3 = () => {
		const refCurrent = scrollRef3.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: 2000, top: 0, behavior: 'smooth' })
			setIsStart3(false)
		}
	}

	const handleLeftClick3 = () => {
		const refCurrent = scrollRef3.current as any
		if (refCurrent) {
			refCurrent.scrollBy({ left: -2000, top: 0, behavior: 'smooth' })
			setIsStart3(true)
		}
	}

	return (
		<div className="margin-from-prev-comp">
			<div className="partners relative">
                <h1 className="text-centered">Наши партнеры</h1>
				{/* {arrowsNotNeeded ? (
					<div className="hide" />
				) : (
					<div>
						{!isStart1 ? (
							<img
								src={leftArrow}
								className="arrow-left pointer"
								onClick={handleLeftClick1}
								alt="Левая стрелка"
							/>
						) : (
							<div className="hide" />
						)}
						{isStart1 ? (
							<img
								src={rightArrow}
								className="arrow-right pointer"
								onClick={handleRightClick1}
								alt="Правая стрелка"
							/>
						) : (
							<div className="hide" />
						)}
					</div>
				)} */}
				<ul className="cards-cnt cards-cnt-grid1" ref={scrollRef1}>
					<li>
                        <PartnerCard 
                            img={hseBlue}
                            site={'https://we.hse.ru/'}
                            name={'Факультет мировой экономики и политики НИУ ВШЭ'}
                            style={'partner-logo-1'} />
					</li>
					<li>
                        <PartnerCard 
                            img={cultureCenter}
                            site={'https://cc.hse.ru/'}
                            name={'Культурный центр НИУ ВШЭ'}
                            style={'partner-logo-6'} />
					</li>
					<li>
                        <PartnerCard 
                            img={association}
                            site={'http://japanstudies.ru/'}
                            name={'Ассоциация японоведов'}
                            style={'partner-logo-4'} />
					</li>
					<li>
						<PartnerCard 
                            img={japFound}
                            site={'https://jpfmw.ru/'}
                            name={'Отдел японской культуры «JapanFoundation»'}
                            style={'partner-logo-7'} />
					</li>
				</ul>
			</div>
			<div className="partners-2 relative">
				{arrowsNotNeeded ? (
					<div className="hide" />
				) : (
					<div>
						{!isStart2 ? (
							<img
								src={leftArrow}
								className="arrow-left pointer"
								onClick={handleLeftClick2}
								alt="Левая стрелка"
							/>
						) : (
							<div className="hide" />
						)}
						{isStart2 ? (
							<img
								src={rightArrow}
								className="arrow-right pointer"
								onClick={handleRightClick2}
								alt="Правая стрелка"
							/>
						) : (
							<div className="hide" />
						)}
					</div>
				)}
				<ul className="cards-cnt cards-cnt-grid2" ref={scrollRef2}>
					<li>
                        <PartnerCard 
                            img={ikvia}
                            site={'https://iocs.hse.ru/'}
                            name={'Институт классического Востока и Античности НИУ ВШЭ'}
                            style={'partner-logo-8'} />
					</li>
					<li>
                        <PartnerCard 
                            img={school}
                            site={'https://oriental.hse.ru/'}
                            name={'Школа востоковедения НИУ ВШЭ'}
                            style={'partner-logo-1'} />
					</li>
					<li>
                        <PartnerCard 
                            img={isaa}
                            site={'http://www.iaas.msu.ru/index.php/ru/'}
                            name={'Институт стран Азии и Африки МГУ'}
                            style={'partner-logo-1'} />
					</li>
					<li>
                        <PartnerCard 
                            img={institute}
                            site={'https://www.ivran.ru/'}
                            name={'Институт востоковедения РАН'}
                            style={'partner-logo-1'} />
					</li>
					<li>
                        <PartnerCard 
                            img={manuscript}
                            site={'http://www.orientalstudies.ru/'}
                            name={'Институт восточных рукописей РАН'}
                            style={'partner-logo-1'} />
					</li>


                    <li>
                        <PartnerCard 
                            img={orientalst}
                            site={'https://vk.com/vostok.life'}
                            name={'Направление «Востоковедение» Лицея НИУ ВШЭ'}
                            style={'partner-logo-1'} />
					</li>
					<li>
                        <PartnerCard 
                            img={seiran}
                            site={'https://vk.com/seiran.school'}
                            name={'Школа японского языка Seiran'}
                            style={'partner-logo-3'} />
					</li>
                    <li>
                        <PartnerCard 
                            img={emperor}
                            site={'https://vk.com/tenno_monogatari'}
                            name={'Проект «Повесть об Императоре»'}
                            style={'partner-logo-5'} />
					</li>
                    <li>
                        <PartnerCard 
                            img={sengoku1}
                            site={'https://vk.com/sengokujidai'}
                            name={'«Sengoku Jidai»'}
                            style={'partner-logo-7'} />
					</li>
                    <li>
                        <PartnerCard 
                            img={sengoku2}
                            site={'https://vk.com/sengoku_ru'}
                            name={'Ассоциация «Сэнгоку Дзидай»'}
                            style={'partner-logo-1'} />
					</li>
				</ul>
			</div>
			<div className="partners-2 relative">
				{arrowsNotNeeded ? (
					<div className="hide" />
				) : (
					<div>
						{!isStart3 ? (
							<img
								src={leftArrow}
								className="arrow-left pointer"
								onClick={handleLeftClick3}
								alt="Левая стрелка"
							/>
						) : (
							<div className="hide" />
						)}
						{isStart3 ? (
							<img
								src={rightArrow}
								className="arrow-right pointer"
								onClick={handleRightClick3}
								alt="Правая стрелка"
							/>
						) : (
							<div className="hide" />
						)}
					</div>
				)}
				<ul className="cards-cnt cards-cnt-grid3" ref={scrollRef3}>
                <li>
                        <PartnerCard 
                            img={samurai}
                            site={'https://vk.com/club40187114'}
                            name={'КИР «Самураи Симадзу»'}
                            style={'partner-logo-8'} />
					</li>
					<li>
                        <PartnerCard 
                            img={musubi}
                            site={'https://vk.com/hse_japan'}
                            name={'Японский клуб «Musubi» НИУ ВШЭ'}
                            style={'partner-logo-3'} />
					</li>
					<li>
                        <PartnerCard 
                            img={discussionClub}
                            site={'https://vk.com/club191169490'}
                            name={'Научно-дискуссионный клуб по Японии'}
                            style={'partner-logo-3'} />
					</li>
					<li>
                        <PartnerCard 
                            img={clubMsu}
                            site={'https://vk.com/jpclubiaasmsu'}
                            name={'Японский клуб «Chikyū Rinjin» ИСАА МГУ'}
                            style={'partner-logo-3'} />
					</li>
					<li>
                        <PartnerCard 
                            img={clubRtu}
                            site={'https://vk.com/japanclubm'}
                            name={'Клуб японской культуры РТУ МИРЭА'}
                            style={'partner-logo-3'} />
					</li>





                    <li>
                        <PartnerCard 
                            img={oriental}
                            site={'https://vk.com/vost_sno'}
                            name={'СНО «Востоковедение» СПб НИУ ВШЭ'}
                            style={'partner-logo-6'} />
					</li>
					<li>
                        <PartnerCard 
                            img={clubMgimo}
                            site={'https://vk.com/japanclubmgimo'}
                            name={'Японский клуб НСО МГИМО'}
                            style={'partner-logo-3'} />
					</li>
                    <li>
                        <PartnerCard 
                            img={sakura}
                            site={'https://vk.com/great_japan2020'}
                            name={'Проект «Сакура и Хризантема»'}
                            style={'partner-logo-6'} />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Partners
