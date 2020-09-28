import React from 'react'
import { useSpring, animated } from 'react-spring'
import hse from '../../assets/images/hse-blue.svg'
import hseBlack from '../../assets/images/hse-black.svg'
import seiran from '../../assets/images/seiran.svg'
import emperor from '../../assets/images/emperor.jpg'
import isaa from '../../assets/images/isaa.jpeg'
import vostok from '../../assets/images/vostok.png'
import vyshka from '../../assets/images/vyshka.jpg'
import samurai from '../../assets/images/samurai.jpg'
import musubi from '../../assets/images/musubi.jpg'
import japFoundImg from '../../assets/images/japfound.png'
import discussionClubImg from '../../assets/images/discussionclub.jpg'
import clubMsu from '../../assets/images/clubmsu.jpg'
import clubRtu from '../../assets/images/clubrtu.jpg'
import clubMgimo from '../../assets/images/clubmgimo.jpg'
import oriental from '../../assets/images/oriental.jpg'
import './PartnerCard.css'

const partners = [
	{
		img: hseBlack,
		site: 'https://iocs.hse.ru/',
		name: 'Институт классического Востока и Античности НИУ ВШЭ',
		style: 'partner-logo-1',
	},
	{
		img: hse,
		site: 'https://oriental.hse.ru/',
		name: 'Школа востоковедения НИУ ВШЭ',
		style: 'partner-logo-1',
	},
	{
		img: emperor,
		site: 'https://vk.com/tenno_monogatari',
		name: 'Проект «Повесть об Императоре»',
		style: 'partner-logo-5',
	},

	// The Second row
	{
		img: isaa,
		site: 'http://www.iaas.msu.ru/index.php/ru/',
		name: 'Институт стран Азии и Африки МГУ',
		style: 'partner-logo-3',
	},
	{
		img: vostok,
		site: 'https://www.ivran.ru/',
		name: 'Институт востоковедения РАН',
		style: 'partner-logo-3',
	},
	{
		img: vyshka,
		site: 'https://school.hse.ru/',
		name: 'Лицей НИУ ВШЭ',
		style: 'partner-logo-3',
	},
	{
		img: seiran,
		site: 'https://seiran.school/',
		name: 'SEIRAN',
		style: 'partner-logo-3',
	},
	{
		img: samurai,
		site: 'https://vk.com/club40187114',
		name: 'КИР «Самураи Симадзу»',
		style: 'partner-logo-3',
	},

	// The Third row
	{
		img: musubi,
		site: 'https://vk.com/hse_japan',
		name: 'Японский клуб «Musubi» НИУ ВШЭ',
		style: 'partner-logo-3',
	},
	{
		img: japFoundImg,
		site: 'https://jpfmw.ru/',
		name: 'Отдел японской культуры «JapanFoundation»',
		style: 'partner-logo-7',
	},
	{
		img: discussionClubImg,
		site: 'https://vk.com/club191169490',
		name: 'Научно-дискуссионный клуб по Японии',
		style: 'partner-logo-3',
	},
	{
		img: clubMsu,
		site: 'https://vk.com/jpclubiaasmsu',
		name: 'Японский клуб «Chikyū Rinjin» ИСАА МГУ',
		style: 'partner-logo-3',
	},
	{
		img: clubRtu,
		site: 'https://vk.com/japanclubm',
		name: 'Клуб японской культуры РТУ МИРЭА',
		style: 'partner-logo-3',
	},

	// The Fourth row
	{
		img: oriental,
		site: 'https://vk.com/vost_sno',
		name: 'СНО «Востоковедение» СПб НИУ ВШЭ',
		style: 'partner-logo-6',
	},
	{
		img: clubMgimo,
		site: 'https://vk.com/japanclubmgimo',
		name: 'Японский клуб НСО МГИМО',
		style: 'partner-logo-3',
	},
]

type PartnerCardProps = {
    // num: number
    img: any
	site: string
	name: string
	style: string
}

const PartnerCard = ({ img, site, name, style }: PartnerCardProps) => {
	const [props, set] = useSpring(() => ({
		s: 1,
		config: { mass: 1, tension: 350, friction: 50 },
	}))
	return (
		<a href={site} className="black" target="_blank">
			<animated.div
				onMouseEnter={() => set({ s: 1.05 })}
				onMouseLeave={() => set({ s: 1 })}
				style={{ transform: props.s.interpolate((s) => `scale(${s})`) }}
				className="partner-card border-radius text-centered"
			>
				<div className="partner-logo-cnt container pointer">
					<img
						src={img}
						alt={name}
						className={style}
					/>
				</div>

				<div className="partner-info">
					<h2>{name}</h2>
				</div>
			</animated.div>
		</a>
	)
}

export default PartnerCard
