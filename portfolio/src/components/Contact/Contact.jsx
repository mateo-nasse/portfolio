import React from 'react'

import styles from "./Contact.module.css"
import { getImageUrl } from '../../utils'

export const Contact = () => {
  return (
    <footer id='contact' className={styles.container}>
        <div className={styles.text}>
            <h2>
                Contact
            </h2>
            <p>
                Feel free to reach out!
            </p>
        </div>
        <div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img src={getImageUrl("contact/emailIcon.png")} alt="email-icon" />
                    <a href="mailto:mateonasse@gmail.com">mateonasse@gmail.com</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageUrl("contact/linkedinIcon.png")} alt="email-icon" />
                    <a href="https://www.linkedin.com/in/mateonasse/">linkedin.com/in/mateonasse</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageUrl("contact/githubIcon.png")} alt="email-icon" />
                    <a href="https://github.com/mateo-nasse">github.com/mateo-nasse</a>
                </li>
            </ul>
        </div>
    </footer>
  )
}
