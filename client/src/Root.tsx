import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Element } from 'react-scroll'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import About from './components/About/About'
import Faq from './components/Faq/Faq'
import Backdrop from './components/Backdrop/Backdrop'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Partners from './components/Partners/Partners'
import Footer from './components/Footer/Footer'
import DonateDrawer from './components/DonateDrawer/DonateDrawer'

const Root = () => {
	const [isSideDrawerOpen, setSideDrawerOpen] = useState(false)
	const [isDonateDrawerOpen, setDonateDrawerOpen] = useState(false)
	const [isBackdropOpen, setBackdropOpen] = useState(false)
	const [isAskFormShown, setAskFormShown] = useState(false)
	const [isPolicyOpened, setPolicyOpened] = useState(false)

	const drawerToggleClickHandler = () => {
		setSideDrawerOpen(!isSideDrawerOpen)
		setBackdropOpen(!isBackdropOpen)
	}

	const closeToggleClickHandler = () => {
		setSideDrawerOpen(false)
		setBackdropOpen(false)
		setAskFormShown(false)
	}

	const openAskForm = () => {
		setBackdropOpen(true)
		setAskFormShown(true)
	}

	if (isAskFormShown && !isPolicyOpened) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = 'visible'
	}

	const swipeHandler = useSwipeable({
		onSwipedRight: (eventData) => {
			setDonateDrawerOpen(false)
		},
	})

	return (
		<div>
			<Nav
				drawerToggleClickHandler={drawerToggleClickHandler}
				setDonateDrawerOpen={setDonateDrawerOpen}
			/>
			<DonateDrawer
				exitClick={() => setDonateDrawerOpen(false)}
				isShown={isDonateDrawerOpen}
			/>
			<div onClick={() => setDonateDrawerOpen(false)} {...swipeHandler}>
				<SideDrawer
					closeButtonClick={closeToggleClickHandler}
					isShown={isSideDrawerOpen}
				/>
				<Backdrop
					isShown={isBackdropOpen}
					exitClick={closeToggleClickHandler}
					isAskFormShown={isAskFormShown}
					setPolicyOpened={setPolicyOpened}
				/>
				<Element name="home">
					<Home />
				</Element>
				<Element name="about">
					<About />
				</Element>
				<Element name="faq">
					<Faq buttonClick={openAskForm} />
				</Element>
				<Partners />
				<Footer />
			</div>
		</div>
	)
}

export default Root
