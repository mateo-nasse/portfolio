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
                I'm a ___ developer with ___ of experience in ___. Reach out if you'd like to know more!
            </p>
            <a href="mailto:mateonasse@gmail.com" className={styles.contactBtn}>Contact Me</a>
        </div>
        <div className={styles.imageContainer}>
            <div
                className={`${styles.imageInner} ${isFlipped ? styles.flipped : ''}`}
                onMouseEnter={() => {setIsFlipped(true); console.log("entered")}}
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
