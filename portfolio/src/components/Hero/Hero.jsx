import React, { useState } from 'react'
import { getImageUrl } from '../../utils'
import styles from "./Hero.module.css"

export const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>
                Hi, I'm Mateo
            </h1>
            <p className={styles.description}>
                Full-stack developer with a focus on data pipelines, web scraping, and building clean, functional interfaces. I enjoy working across the stack from automating data collection to shipping the frontend that makes it useful.
            </p>
            <a href="mailto:mateonasse@gmail.com" className={styles.contactBtn}>Contact Me</a>
        </div>
        <div className={styles.imageContainer}>
            <div
                className={`${styles.imageInner} ${isFlipped ? styles.flipped : ''}`}
                onMouseEnter={() => {setIsFlipped(true)}}
                onMouseLeave={() => setIsFlipped(false)}
            >
                <div className={`${styles.frontImage} ${styles.imageCard}`}>
                </div>
                <div className={`${styles.backImage} ${styles.imageCard}`}>
                </div>
            </div>
        </div>
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
    </section>
  )
}