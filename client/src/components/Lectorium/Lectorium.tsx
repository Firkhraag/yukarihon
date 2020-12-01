import React from 'react'
// import YouTube from 'react-youtube'
import './Lectorium.css'

const Lectorium = () => {

    // const onReady = (event: any) => {
    //     event.target.pauseVideo()
    // }

    return (
            <div className="text-centered" style={{marginTop: '8.5em'}}>
                <h1 className="link-head"><a href="https://www.youtube.com/watch?v=Q4OZE4b2eQk&ab_channel=%D0%9B%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D0%B9%D0%AE%D0%BA%D0%B0%D1%80%D0%B8%E2%80%A2%D0%AF%D0%BF%D0%BE%D0%BD%D0%B8%D1%8F%D0%B2%D1%8D%D0%BF%D0%BE%D1%85%D1%83%D0%AD%D0%B4%D0%BE" style={{color: '#7e4399'}}>День 1. Youtube</a></h1>
                <h1 className="link-head" style={{marginTop: '0.5em'}}><a href="https://www.youtube.com/watch?v=iTGMZiIVsWI&ab_channel=%D0%9B%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D0%B9%D0%AE%D0%BA%D0%B0%D1%80%D0%B8%E2%80%A2%D0%AF%D0%BF%D0%BE%D0%BD%D0%B8%D1%8F%D0%B2%D1%8D%D0%BF%D0%BE%D1%85%D1%83%D0%AD%D0%B4%D0%BE" style={{color: '#558bc8'}}>День 2. Youtube</a></h1>
                <h1 className="link-head" style={{marginTop: '1em'}}><a href="https://vk.com/yukarium?z=video-184996744_456239056%2F13bab29b43cfb7806e%2Fpl_wall_-184996744" style={{color: '#7e4399'}}>День 1. ВКонтакте</a></h1>
                <h1 className="link-head" style={{marginTop: '0.5em'}}><a href="https://vk.com/yukarium?z=video-184996744_456239057%2F2c54cfa91159c0b601%2Fpl_wall_-184996744" style={{color: '#558bc8'}}>День 2. ВКонтакте</a></h1>

                {/* <YouTube
                    videoId={'Q4OZE4b2eQk'}
                    className="youtube"
                    onReady={onReady}
                /> */}
            </div>
    )
}

export default Lectorium
