import React from 'react'

import styles from "./ProjectCard.module.css"
import { getImageUrl } from '../../utils'  

export const ProjectCard = ({ project : { title, imageSrc, description, skills, demo, source, demoAv, sourceAv }}) => {
  return (
    <div className={styles.container}>
        <img src={getImageUrl(imageSrc)} alt={`Image of ${title}`} className={styles.image}/>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p>{skills}</p>
        <ul className={styles.skills}>
            {
                skills.map((skill, id) => {
                    return (
                        <li key={id} className={styles.skill}>{skill}</li>
                    )
                })
            }
        </ul>
        <div className={styles.links}>
            <a href={demo} className={`${styles.link} ${demoAv ? styles.linkAv : '' }`}>Demo</a>
            <a href={source} className={`${styles.link} ${sourceAv ? styles.linkAv : '' }`}>Source</a>
        </div>
    </div>
  )
}
