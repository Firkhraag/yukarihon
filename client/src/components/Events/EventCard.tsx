import React, { useState, useRef, useContext, useEffect } from 'react';
import { useSpring, useChain, animated, config } from 'react-spring';
import { Img } from 'react-image';

import Spinner from '../Spinner/Spinner';
import clockViolet from '../../assets/images/clock-violet.svg';
import clockBlue from '../../assets/images/clock-blue.svg';
import exit from '../../assets/images/close-ev.svg';
import exitBlue from '../../assets/images/close-ev-blue.svg';
import { CardStatesContext } from '../../store/CardStatesStore';
import './EventCard.css';

type EventCardProps = {
    timeIndex: number
    eventName: string
    lecturerName: string
    time: string
    groupNum: number
    day: number
    desc: string
    lecturerDesc: string
    maxNumOfPeople: number
}

const EventCard = ({ timeIndex, eventName, lecturerName, time, groupNum, day, desc, lecturerDesc, maxNumOfPeople }: EventCardProps) => {

    const [eventProperties, _, __, setOpenedCard, setCheckedCard] = useContext(CardStatesContext);
    const [currNumOfPeople, setCurrNumOfPeople] = useState(0);

    const open = ((eventProperties.openedCard.groupNum === groupNum) && (eventProperties.openedCard.cardNum === timeIndex));
    const checked = day !== -1 ? (eventProperties.checkedCards[day][timeIndex] === groupNum) : false;
    const moreActive = (desc !== null) || (lecturerDesc !== null);

    const springRef = useRef();
    const propsSpring = useSpring({
        ref: springRef,
        config: config.stiff,
        from: { opacity: 1 as any, transform: 'scale(1)' as any },
        to: { opacity: open ? 0 : 1 as any, transform: open ? 'scale(0)' : 'scale(1)' as any}
    });

    const springOpenRef = useRef();
    const propsSpringOpen = useSpring({
        ref: springOpenRef,
        config: config.stiff,
        from: { opacity: 0 as any, transform: 'scale(0)' as any },
        to: { opacity: open ? 1 : 0 as any, transform: open ? 'scale(1)' : 'scale(0)' as any}
    });

    useChain(open ? [springRef, springOpenRef] : [springOpenRef, springRef], [0, 0.1])

    let cardStyle = 'card no-blur  line-height white-bg violet-card padded-container';
    if (!open) {
        cardStyle += ' violet'
    }
    let clockTextStyle = 'violet align-with-clock';
    if (groupNum === 1) {
        cardStyle = 'card no-blur  line-height white-bg violet-blue-card padded-container';
        clockTextStyle = 'violet-blue align-with-clock';
    }
    if (groupNum === 2) {
        cardStyle = 'card no-blur  line-height white-bg blue-card padded-container';
        if (!open) {
            cardStyle += ' blue'
        }
        clockTextStyle = 'blue align-with-clock';
    }

    // useEffect(() => {
    //     fetch('https://yukarihonserver.website:3000/num-of-people?day=' + day + '&group=' + groupNum + '&time=' + timeIndex)
    //     .then(data => data.json())
    //     .then(data => {
    //         setCurrNumOfPeople(data.count);
    //     }).catch(err => {
    //         console.log('Error');
    //     });
    // });

    return <div className="relative">
        <animated.div className="absolute ev-card-adiv-cnt" style={propsSpringOpen}><img src={groupNum ===  2 ? exitBlue : exit} alt="Обратно" onClick={() => setOpenedCard(-1, -1)} className="close-img pointer" /></animated.div>
        <animated.div style={propsSpring} className={cardStyle}>
            <h2 className={groupNum === 2 ? "blue container text-centered" : groupNum === 0 ? 'violet container text-centered' : 'violet-blue container text-centered'}>{eventName}</h2>
            <hr />
            <div className="black">
                <div className="lecturer-name" style={{marginBottom: '.25em'}}>{lecturerName}</div>
                <div className="flex-centered-vert">
                    <Img src={((groupNum === 2) || (groupNum === 1)) ? clockBlue : clockViolet} className="clock-icon" loader={<Spinner where='ev-card' />} />
                    <p className={clockTextStyle}>{time}</p>
                </div>
                { moreActive ? <span className="pointer ev-more" onClick={() => setOpenedCard(groupNum, timeIndex)}>Подробнее</span> : <div className="hide" /> }
            </div>
            
            {/* <p className={(currNumOfPeople < maxNumOfPeople) ? "absolute black seats-count" : "absolute black seats-count-full"}>{`${currNumOfPeople}/${maxNumOfPeople}`}</p>
            { (currNumOfPeople < maxNumOfPeople) ? <div className={ checked ? "checkbox white-bg checked pointer absolute" : "checkbox white-bg unchecked pointer absolute"} onClick={ () => setCheckedCard(groupNum, timeIndex) }>
                <div className="checkbox-checkmark absolute" />
            </div> : <div className="hide" />} */}
        </animated.div>
        <animated.div style={propsSpringOpen} className={cardStyle + ' absolute opened-card el-vert-scroll'}>
            {/* <div className={groupNum ===  0 ? "info-open info-open-v" : groupNum ===  2 ? "info-open info-open-b" : "info-open info-open-vb"}> */}
                { desc !== null ? <div><h3 className="text-centered">О мероприятии</h3>
                <hr />
                { desc }
                <hr /></div> : <div className="hide" />}
                <h3 className="text-centered">О ведущих</h3>
                <hr />
                { lecturerDesc }
            {/* </div> */}
        </animated.div>    
    </div>;
}

export default EventCard;