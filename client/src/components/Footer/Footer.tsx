import React, { useState, useLayoutEffect } from 'react'
import vkLogo from '../../assets/images/vk-logo.svg'
import './Footer.css'

const Footer = () => {

    const [size, setSize] = useState([2000, 2000]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

	return (
		<div className="full-width footer grad-bg relative desktop-font">
			<div className={ size[0] > 750 ? "footer-cnt flex" : "footer-cnt flex-column" }>
				<div className={ size[0] > 750 ? "footer-div" : "footer-div text-centered mrg-bot" }>
					<p className="contact-information-margin">
						<span className="bold">Наша почта:</span>
						<br />
						yukari.lectorium@gmail.com
					</p>
				</div>
				<div className={ size[0] > 750 ? "footer-div" : "footer-div text-centered mrg-bot" } >
					<p>
						<span className="bold">Автор проекта:</span>
						<br />
						Иван Тюленев
					</p>
					<p>tyulenev1313@gmail.com</p>
					<p className="contact-information-margin">
						8 (915) 480-40-13
					</p>
				</div>
				<div className={ size[0] > 750 ? "footer-div" : "footer-div text-centered" }>
					<p>
						<span className="bold">Cтраница ВКонтакте:</span>
						<br />
						<a
							href="https://vk.com/yukarium"
							className="white"
							target="_blank"
						>
							vk.com/yukarium
						</a>
					</p>
					<a href="https://vk.com/yukarium" target="_blank">
						<img
							src={vkLogo}
							alt="VK ссылка"
							className="vk-logo pointer"
						/>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer
