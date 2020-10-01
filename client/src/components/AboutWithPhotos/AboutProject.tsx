import React from 'react'
import { useSpring, config, animated } from 'react-spring'
import exit from '../../assets/images/exit.svg'
import './AboutProject.css'

type AboutProjectProps = {
    img: any
    title: string
    desc: string
    style: string
    isDescShown: boolean
    setDescShown: () => void
    setDescClose: () => void
}

const AboutProject = ({ img, title, desc, style, isDescShown, setDescShown, setDescClose }: AboutProjectProps) => {

    const propsSpringOpen = useSpring({
        config: config.stiff,
        from: { transform: 'scale(0)' as any },
        to: { transform: isDescShown ? 'scale(1)' : 'scale(0)' as any}
    });

    return (
        <div className="container relative">
            <animated.div className={ isDescShown ? "border-radius about-proj-desc absolute line-height white-bg" : "hide"} style={propsSpringOpen}>
                <img className="pointer" onClick={setDescClose} style={{float: 'right'}} src={exit} />
                <h2>{title}</h2>
                <p>{desc}</p>
            </animated.div>
            <img className={style + " pointer"} onClick={setDescShown} src={img} alt={title} />
        </div>
    )
}

export default AboutProject
