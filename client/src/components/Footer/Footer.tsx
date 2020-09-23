import React from 'react'
import vkLogo from '../../assets/images/vk-logo.svg'
import './Footer.css'

const Footer = () => {
	return (
		<div className="full-width footer grad-bg relative desktop-font">
			<div className="footer-cnt flex">
				<div className="footer-div">
					<p className="contact-information-margin">
						<span className="bold">Наша почта:</span>
						<br />
						yukari.lectorium@gmail.com
					</p>
				</div>
				<div className="footer-div">
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
				<div className="footer-div">
					<p>
						<span className="bold">Cтраница в ВКонтакте:</span>
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
