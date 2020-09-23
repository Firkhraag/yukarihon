import React from 'react'
import YouTube from 'react-youtube'
import './Lectorium.css'

const Lectorium = () => {

    const onReady = (event: any) => {
        event.target.pauseVideo()
    }

    return (
        <div className="margin-from-prev-comp">
            <h1 className="text-centered">Лекторий</h1>
            <div className="text-centered" style={{marginTop: '1.5em'}}>
                <YouTube
                    videoId={'BnWl9vNJp8Y'}
                    className="youtube"
                    onReady={onReady}
                />
            </div>
        </div>
    )
}

export default Lectorium
