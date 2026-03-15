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
                        <p>Building responsive, intuitive interfaces with React and Svelte, focused on clean design and smooth user experience.</p>
                    </div>
                </li>
                <li className={styles.card}>
                    <img src={getImageUrl("about/serverIcon.png")} alt="server-image" />
                    <div className={styles.cardText}>
                        <h3>Back-End & Data</h3>
                        <p>Building scalable data pipelines, web scrapers, and backend systems — with experience across Python, Java, SQL, and cloud-based deployment.</p>
                    </div>
                </li>
                <li className={styles.card}>
                    <img src={getImageUrl("about/uiIcon.png")} alt="cursor-image" />
                    <div className={styles.cardText}>
                        <h3>Problem Solver</h3>
                        <p>CS degree from TU Delft, with a minor in Creative Facilitation. I approach problems with both technical rigour and an eye for usability.</p>
                    </div>
                </li>
            </ul>
        </div>
         <div className={styles.topBlur} />
    </section>
  )
}