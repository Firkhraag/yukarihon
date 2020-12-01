import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import httpClient from '../../axios'
import './RegisterForm.css'

type RegisterFormProps = {
	openPopup: (isSuccess: boolean) => void
}

const RegisterForm = ({ openPopup }: RegisterFormProps) => {
	const [buttonPointerEventsDisabled, setButtonPointerEventsDisabled] = useState(false)
	const [submitButtonClicked, setSubmitButtonClicked] = useState(false)
	const [inputValues, setInputValues] = useState({
		name: '',
		email: '',
	})
	const [honeyPass, setHoneyPass] = useState('')

	const onHoneyChange = (event: React.FormEvent<HTMLInputElement>) => {
		setHoneyPass(event.currentTarget.value)
	}
	const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
		const name = event.currentTarget.value
		setInputValues({ ...inputValues, name: name })
	}
	const onEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
		const email = event.currentTarget.value
		setInputValues({ ...inputValues, email: email })
	}

	const checkName = (name: string) => {
		if (name) {
			if (name.length < 100) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	const checkEmail = (email: string) => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (re.test(email)) {
			if (email.length < 256) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	// const readyToBeSubmitted =
    // 	checkName(inputValues.name) && checkEmail(inputValues.email)
    const readyToBeSubmitted = false

	let buttonStyle =
		'enabled submit absolute form-inputs-width grad-bg pointer white container border-radius'
	if (!readyToBeSubmitted) {
		buttonStyle =
			'disabled-btn submit absolute form-inputs-width container border-radius'
	}

	const getButtonStyle = () => {
		if (submitButtonClicked) {
			return ' checked'
		} else {
            if (buttonPointerEventsDisabled) {
                return ' disabled-pnt-events'
            }
			return ''
		}
	}

	// const submitButtonClickHandler = async () => {
	// 	if (readyToBeSubmitted) {
	// 		if (honeyPass === '') {
	// 			try {
    //                 setButtonPointerEventsDisabled(true)
	// 				await httpClient.post('/add', {
	// 					email: inputValues.email,
	// 					username: inputValues.name,
    //                 })
    //                 // await httpClient.post('/test', {
	// 				// 	email: inputValues.email,
	// 				// 	username: inputValues.name,
	// 				// })
	// 				setSubmitButtonClicked(true)
	// 				setTimeout(() => {
	// 					// setSubmitButtonClicked(false)
	// 					openPopup(true)
	// 				}, 4500)
	// 			} catch (e) {
    //                 if (e.response.status === 409) {
    //                     setButtonPointerEventsDisabled(false)
    //                     openPopup(null)
    //                     return
    //                 }
    //                 setButtonPointerEventsDisabled(false)
    //                 openPopup(false)
	// 				console.log('Error occured!', e)
	// 			}
	// 		}
	// 	}
	// }

	return (
		<div className="margin-from-prev-comp">
			<h1 className="text-centered">Регистрация</h1>
			<div className="form-reg flex-column-centered-row">
				<div className="input-fields">
					<div
						style={{ marginTop: 10 }}
						className="flex-column relative input-margin-bottom"
					>
						<input
							type="text"
							className="form-inputs-width"
							onChange={onNameChange}
							value={inputValues.name}
							required
						/>
						<label>Как вас зовут?</label>
					</div>

					<div className="flex-column relative input-margin-bottom">
						<input
							type="text"
							className="form-inputs-width"
							onChange={onEmailChange}
							value={inputValues.email}
							required
						/>
						<label>Электронная почта</label>
					</div>

					<input
						type="text"
						name="password"
						style={{ display: 'none' }}
						tabIndex={-1}
						autoComplete="off"
						onChange={onHoneyChange}
					/>
				</div>

				<div className={getButtonStyle()}>
					<div className="button-wrapper container white full-width">
						<div
							className={buttonStyle}
							onClick={null}
						>
							Зарегистрироваться
						</div>
						<div className="loader absolute loader-violet" />
						<div className="loader absolute loader-blue" />
						<div className="check-wrapper absolute">
							<div className="checkmark" />
						</div>
					</div>
					{/* <p
						className="form-inputs-width line-height text-centered"
						style={{ marginBottom: '1em' }}
					>
						Нажимая на кнопку, вы даете согласие на обработку
						персональных данных и соглашаетесь c{' '}
						<Link to="/policy">политикой конфиденциальности</Link>,<br />а также подписываетесь на рассылку свежих новостей нашего проекта и напоминаний о событии.
					</p> */}
                    <p
						className="form-inputs-width line-height text-centered"
						style={{ marginBottom: '1em' }}
					>
						Мероприятие уже прошло
					</p>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm
