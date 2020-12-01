import React, { useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import './Popup.css'

type PopupProps = {
	isShown: boolean
	isSuccess: boolean
	closeFunc: () => void
}

const Popup = ({ isShown, isSuccess, closeFunc }: PopupProps) => {
	const props = useSpring({
		config: config.stiff,
		from: { transform: 'scale(1.5)' as any },
		to: { transform: isShown ? 'scale(1.0)' : ('scale(1.5)' as any) },
	})

	let className = 'hide'
	if (isShown) {
		className = 'container white-bg border-radius finish-popup'
	}

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			closeFunc()
		}
		document.body.addEventListener('click', handler)
		return () => document.body.removeEventListener('click', handler)
	}, [])

	return (
		<animated.div className={className} style={props}>
			{isSuccess == true ? (
				<h1 className="text-centered pointer">
					Подтверждение регистрации отправлено на указанный вами
					почтовый ящик
					<br />
					(не забудьте проверить спам)
				</h1>
			) : isSuccess == null ? (
				<h1 className="text-centered pointer">
					Данный пользователь уже зарегистрирован
				</h1>
			) : (
				<h1 className="text-centered pointer">Произошла ошибка</h1>
			)}
		</animated.div>
	)
}

export default Popup
