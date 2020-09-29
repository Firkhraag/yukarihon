import React from 'react'
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

    return (
        <div className="container relative">
            <div className={ isDescShown ? "border-radius about-proj-desc absolute line-height white-bg" : "hide"}>
                <img className="pointer" onClick={setDescClose} style={{float: 'right'}} src={exit} />
                <h2>{title}</h2>
                <p>{desc}</p>
            </div>
            <img className={style + " pointer"} onClick={setDescShown} src={img} alt={title} />
        </div>
    )
}

export default AboutProject
