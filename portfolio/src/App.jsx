import { sections } from './content'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Section } from './components/Section'
import { Work } from './components/Work'
import { Projects } from './components/Projects'
import { About } from './components/About'
import { Contact, Campfire } from './components/Contact'

const bodies = {
  work: <Work />,
  projects: <Projects />,
  about: <About />,
  contact: <Contact />,
}

function App() {
  return (
    <>
      <a href="#work" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        {sections.map((s, i) => (
          <Section key={s.id} id={s.id} index={i + 1} title={s.title}>
            {bodies[s.id]}
          </Section>
        ))}
      </main>
      <Campfire />
    </>
  )
}

export default App
