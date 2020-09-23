import React, { createContext, useState, useEffect } from 'react'

const WindowPropertiesContext = createContext(null)
export { WindowPropertiesContext }

type WindowPropertiesProviderProps = {
	children: React.ReactNode
}

export const WindowPropertiesProvider = ({
	children,
}: WindowPropertiesProviderProps) => {
	const [windowProperties, setWindowProperties] = useState({
		navVisible: true,
	})
	const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset)

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset
		const visible = prevScrollpos > currentScrollPos
		setPrevScrollpos(currentScrollPos)
		setWindowProperties({ navVisible: visible })
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	return (
		<WindowPropertiesContext.Provider value={[windowProperties]}>
			{children}
		</WindowPropertiesContext.Provider>
	)
}
