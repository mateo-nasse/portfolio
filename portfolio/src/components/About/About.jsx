import React from 'react'

import styles from "./About.module.css"
import { getImageUrl } from '../../utils'


export const About = () => {
  return (
    <section className={styles.container} id='about'>
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <img src={getImageUrl("about/aboutImage.png")} alt="about-image" className={styles.aboutImg}/>
            <ul className={styles.aboutList}>
                <li className={styles.card}>
                    <img src={getImageUrl("about/cursorIcon.png")} alt="cursor-image" />
                    <div className={styles.cardText}>
                        <h3>Title</h3>
                        <p>description very long there are many wods that need to fit here fot it to make sense as a description lorem lorem lorem shakira</p>
                    </div>
                </li>
                <li className={styles.card}>
                    <img src={getImageUrl("about/serverIcon.png")} alt="server-image" />
                    <div className={styles.cardText}>
                        <h3>Title</h3>
                        <p>description very long there are many wods that need to fit here fot it to make sense as a description lorem lorem lorem shakira lorelreorelreorleoreo</p>
                    </div>
                </li>
                <li className={styles.card}>
                    <img src={getImageUrl("about/cursorIcon.png")} alt="cursor-image" />
                    <div className={styles.cardText}>
                        <h3>Title</h3>
                        <p>description very long there are many wods that need to fit here fot it to make sense as a description lorem lorem lorem shakira</p>
                    </div>
                </li>
            </ul>
        </div>
         <div className={styles.topBlur} />
    </section>
  )
}
