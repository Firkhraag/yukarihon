import React from 'react'

type AboutProjectProps = {
    title: string
    desc: string
}

const AboutProject = ({ title, desc }: AboutProjectProps) => {
    return (
        <div className="partner-info">
			<h2>{title}</h2>
            <p>{desc}</p>
		</div>
    )
}

export default AboutProject
