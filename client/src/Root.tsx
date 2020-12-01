import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Element } from 'react-scroll'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import About from './components/About/About'
import AboutWithPhotos from './components/AboutWithPhotos/AboutWithPhotos'
import Lectorium from './components/Lectorium/Lectorium'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Faq from './components/Faq/Faq'
import Backdrop from './components/Backdrop/Backdrop'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Partners from './components/Partners/Partners'
import Footer from './components/Footer/Footer'
import Popup from './components/Popup/Popup'
import Schedule from './components/Schedule/Schedule'
import DonateDrawer from './components/DonateDrawer/DonateDrawer'

const Root = () => {
	const [isSideDrawerOpen, setSideDrawerOpen] = useState(false)
	const [isDonateDrawerOpen, setDonateDrawerOpen] = useState(false)
	const [isBackdropOpen, setBackdropOpen] = useState(false)
	const [isAskFormShown, setAskFormShown] = useState(false)

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

	if (isAskFormShown) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = 'visible'
	}

	const swipeHandler = useSwipeable({
		onSwipedRight: (eventData) => {
			setDonateDrawerOpen(false)
		},
    })
    

    const [isSuccess, setSuccess] = useState(false)
    const [isPopupShown, setPopupShown] = useState(false)

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
            <Popup isShown={isPopupShown} isSuccess={isSuccess} closeFunc={() => setPopupShown(false)} />
			<div onClick={() => setDonateDrawerOpen(false)} {...swipeHandler}>
				<SideDrawer
					closeButtonClick={closeToggleClickHandler}
					isShown={isSideDrawerOpen}
				/>
				<Backdrop
					isShown={isBackdropOpen}
					exitClick={closeToggleClickHandler}
					isAskFormShown={isAskFormShown}
				/>
                <Element name="lectorium">
					<Lectorium />
				</Element>
				<Element name="home">
					<Home />
				</Element>
				<Element name="about">
					<About />
				</Element>
				<Element name="about_team">
					<AboutWithPhotos />
				</Element>
                <Element name="schedule">
					<Schedule />
				</Element>
                <Element name="register">
					<RegisterForm openPopup={(isSuccess: boolean) => {
                        setSuccess(isSuccess)
                        setPopupShown(true)
                    }} />
				</Element>
				{/* <Element name="lectorium">
					<Lectorium />
				</Element> */}
				<Element name="faq">
					<Faq
						buttonClick={openAskForm}
						openDonateDrawer={() => setDonateDrawerOpen(true)}
					/>
				</Element>
				<Partners />
				<Footer />
			</div>
		</div>
	)
}

export default Root
