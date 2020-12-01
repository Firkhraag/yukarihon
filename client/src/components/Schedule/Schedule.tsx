import React, { useState, useLayoutEffect } from 'react'
import schedule1 from '../../assets/images/schedule1.jpg'
import schedule2 from '../../assets/images/schedule2.jpg'
import './Schedule.css'

const Schedule = () => {

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
            <div className="form-reg flex-column-centered-row">
                {/* <div className={ size[0] > 750 ? "flex" : "flex-column"}> */}
                <div className="schedule-img-cnt">
                    {/* <img className={ size[0] > 750 ? "schedule-img img-mrg-right" : "schedule-img img-mrg-bot"} src={schedule1} /> */}
                    <img className="schedule-img img-mrg" src={schedule1} />
                    <img className="schedule-img" src={schedule2} />
                </div>
            </div>
        </div>
    )
}

export default Schedule
