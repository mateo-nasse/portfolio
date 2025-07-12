import React from 'react'

import styles from "./About.module.css"
import { getImageUrl } from '../../utils'


export const About = () => {
  return (
    <section className={styles.container} id='about'>
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <img src={getImageUrl("about/aboutpic.png")} alt="about-image" className={styles.aboutImg}/>
            <ul className={styles.aboutList}>
                <li className={styles.card}>
                    <img src={getImageUrl("about/cursorIcon.png")} alt="cursor-image" />
                    <div className={styles.cardText}>
                        <h3>Front-End</h3>
                        <p>Built responsive, intuitive interfaces with React and Svelte, focused on smooth interactions and clean design with tools such as Tailwind.</p>
                    </div>
                </li>
                <li className={styles.card}>
                    <img src={getImageUrl("about/serverIcon.png")} alt="server-image" />
                    <div className={styles.cardText}>
                        <h3>Back-End</h3>
                        <p>Developed scalable backend systems in Java with Spring, including real-time features and modular architecture.</p>
                    </div>
                </li>
                <li className={styles.card}>
                    <img src={getImageUrl("about/uiIcon.png")} alt="cursor-image" />
                    <div className={styles.cardText}>
                        <h3>UI</h3>
                        <p>Designed clear, user-friendly interfaces with attention to layout, usability, and visual consistency.</p>
                    </div>
                </li>
            </ul>
        </div>
         <div className={styles.topBlur} />
    </section>
  )
}
