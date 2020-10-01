import React from 'react'
import { useSpring, animated } from 'react-spring'
import './PartnerCard.css'

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
