import React, { useState, useLayoutEffect } from 'react'
import YouTube from 'react-youtube'

const Lectorium = () => {

    const onReady = (event: any) => {
        event.target.pauseVideo()
    }

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
        <div className="margin-from-prev-comp">
            <h1 className="text-centered">Лекторий</h1>
            <div className="text-centered" style={{marginTop: '1.5em'}}>
                <YouTube
                    videoId={'BnWl9vNJp8Y'}
                    opts={{
                        height: (size[0] > 800) ? '390' : (size[0] > 700) ? '380' : (size[0] > 600) ? '350' : '320',
                        width: (size[0] > 800) ? '640' : (size[0] > 700) ? '600' : (size[0] > 600) ? '500' : '400',
                        playerVars: {
                            autoplay: 1,
                        },
                    }}
                    onReady={onReady}
                />
            </div>
        </div>
    )
}

export default Lectorium
