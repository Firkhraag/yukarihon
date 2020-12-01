import React, { useState } from 'react'
import httpClient from './axios'
import './App.css'

const App = () => {

    const [isSent, setSent] = useState(false)
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    const onTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
    }
    
    const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
		setText(event.currentTarget.value)
	}

    const onClick = async () => {
        await httpClient.post('/send', {
            title: title,
			text: text,
		})
        setSent(true)
    }

	return (
        isSent ? <div className="container"><h1>Успех</h1></div> : <div className="container">
            <h1>Рассылка</h1>
            <h2>Заголовок</h2>
            <input onChange={onTitleChange} value={title} />
            <h2 style={{marginTop: '.5em'}}>Текст</h2>
		    <textarea onChange={onChange} value={text} />
            <button onClick={onClick}>Отправить</button>
        </div>
	)
}

export default App
