import jomoShot from './assets/projects/jomo.jpg'
import metaspeechShot from './assets/projects/metaspeech.jpg'

// All the words on the site live here, so they're easy to edit without touching layout code.
// Tone: casual, plain, no buzzwords.

export const intro = {
  name: 'Mateo Nasse',
  greeting: "Hi, I'm Mateo.",
  lines: [
    "I'm a full-stack software engineer in Amsterdam. These days I work on diagrams at Miro: the boxes, arrows and shapes people use to map out their ideas.",
    'I like being close to the product: talking to users, trying out ideas, and getting the details right.',
    "Scroll down to see what I've built. It unlocks bit by bit.",
  ],
}

// The CV link only shows up once a PDF is in src/assets/cv/ (export it from Overleaf),
// so the site never has a broken link.
export const cvUrl =
  Object.values(import.meta.glob('./assets/cv/*.pdf', { eager: true, query: '?url', import: 'default' }))[0] ?? null


// Order here is the order on the page and in the unlock counter.
export const sections = [
  { id: 'work', title: 'Work' },
  { id: 'projects', title: 'Projects' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Say hi' },
]

export const work = [
  {
    company: 'Miro',
    role: 'Graduate Software Engineer',
    when: '2026 - now',
    where: 'Amsterdam',
    summary:
      "I'm on the diagramming team, so anything on a Miro board that's made of shapes and connectors is roughly my neighbourhood.",
    items: [
      {
        title: 'Custom shapes',
        text: "People bring their own shapes into Miro, often when moving over from other diagramming tools. I've been working on making those shapes feel more at home on the board, from writing the technical proposal to building it.",
      },
      {
        title: 'Icons in Mermaid diagrams',
        text: 'Miro can turn Mermaid code into diagrams. I built the frontend side of adding icons to them, and tried out a few ways for connectors to hook onto icons before we picked one.',
      },
      {
        title: 'Keyboard navigation',
        text: 'Tabbing through a diagram used to jump around in a confusing order. I fixed that, so getting around a diagram with just a keyboard makes sense now.',
      },
      {
        title: 'And the everyday stuff',
        text: 'Chasing down bugs, taking on-call shifts, and sitting in on customer interviews to hear how people actually use diagrams.',
      },
    ],
  },
  {
    company: 'Apeiron Insights',
    role: 'Junior Software Engineer',
    when: '2025 - 2026',
    where: 'Netherlands',
    summary:
      'My first full-time job. I worked on the browser bots that collect data from across the web (TypeScript, Playwright, Puppeteer), made sure that data stayed clean on its way into the database, and automated the repetitive bits so there was less to fix by hand.',
    items: [],
  },
  {
    company: 'CertAI',
    role: 'Software Developer Intern',
    when: '2025',
    where: 'Netherlands',
    summary: 'A short summer internship making React interfaces easier to use.',
    items: [],
  },
]

export const projects = [
  {
    name: 'Jomo',
    when: '2025 - now',
    tools: 'Python, Playwright, React, Supabase',
    text: "A job board that fills itself. It visits a bunch of company career pages, pulls out the openings, and stores them in a database. Adding a new company takes a few lines of JSON, not new code. The site on top is mobile-first and laid out like a newspaper, so it's actually pleasant to browse.",
    link: { label: 'Have a look', href: 'https://jomo-theta.vercel.app/' },
    // Shown in the "Read more" popup. Sections without text are skipped.
    details: {
      id: 'jomo',
      image: {
        src: jomoShot,
        alt: 'The Jomo Post: a newspaper-style page of job openings, with a search box, a company filter and tabs for seniority.',
        caption: 'The Jomo Post in March 2026: 218 open positions from 21 companies.',
      },
      sections: [
        {
          title: 'Why I built it',
          text: 'Finding jobs on LinkedIn took too long, and by the time I found something good it often felt like I was already too late. So I built something that goes straight to the company career pages and puts the openings in one place.',
        },
        {
          title: 'How it works',
          text: "Python and Playwright visit each company's career page and pull out the openings. They get cleaned up and stored in Supabase (PostgreSQL), and a React app on Vercel shows them, filterable by company and seniority.",
        },
        {
          title: 'The tricky bit',
          text: 'Making one tool work with almost any website. Every career page is built differently, so the challenge was finding a small set of settings that could describe all of them.',
        },
        {
          title: 'The part I like most',
          text: "It's generic. Adding a new company doesn't need any code, just a few lines in a JSON file: the links, some flags, and the selectors that point at the job details.",
        },
        {
          title: 'Why a newspaper?',
          text: 'Most job boards look the same. A newspaper layout made long lists easier to read and browse.',
        },
        {
          title: 'The code',
          text: "The code isn't public, but I'm happy to walk you through it.",
        },
        { title: "What I'd do next", text: '' },
      ],
    },
  },
  {
    name: 'Audio metadata explorer',
    when: '2024',
    tools: 'Svelte, TypeScript',
    text: "A university project for TU Delft. Researchers had audio metadata in all sorts of formats and wanted to explore it without writing code, so we built a web app with filters, sortable tables, and charts that suggest themselves based on what's in the data.",
    link: { label: 'Try it', href: 'https://metaspeech.ewi.tudelft.nl' },
    details: {
      id: 'metaspeech',
      image: {
        src: metaspeechShot,
        alt: 'MetaSpeech: a bar chart of word error rates, with controls for chart type, legend column and PNG or JPG export.',
        caption: 'MetaSpeech turning uploaded audio metadata into a chart.',
      },
      sections: [
        {
          title: 'The idea',
          text: 'Speech researchers at TU Delft had metadata about their audio, like word error rates, in all sorts of file formats. They needed a way to explore it without writing code.',
        },
        {
          title: 'How it works',
          text: 'You upload your data and the app works out what kind of columns it has. From there you can filter and sort it in a table, and it suggests charts that fit the data, which you can tweak and export as PNG or JPG.',
        },
        {
          title: 'My part',
          text: 'We were a team of five. I did a bit of everything, took part in most of the design decisions, and did a lot of the back and forth with the client.',
        },
        {
          title: 'The tricky bit',
          text: "Making it intuitive. The people using it shouldn't need to know which kind of chart fits their data, so the app suggests charts based on what's in it and keeps the options simple.",
        },
      ],
    },
  },
]

export const contact = {
  text: "The fire's going. If you want to talk about work, a project, or anything really, pull up a log.",
  links: [
    { label: 'Email', value: 'mateonasse@gmail.com', href: 'mailto:mateonasse@gmail.com' },
    { label: 'LinkedIn', value: 'in/mateonasse', href: 'https://www.linkedin.com/in/mateonasse' },
    { label: 'GitHub', value: 'mateo-nasse', href: 'https://github.com/mateo-nasse' },
    ...(cvUrl ? [{ label: 'CV', value: 'Download (PDF)', href: cvUrl }] : []),
  ],
  footer: 'Made by Mateo, one square at a time.',
}

export const about = {
  paragraphs: [
    "I'm from Peru, and I've lived all over South, Central and North America before ending up in the Netherlands.",
    'I got into programming the first time I made something work and could actually see it on the screen. That was enough to hook me.',
    "Next to computer science at TU Delft, I did a minor in Creative Facilitation. With AI taking over more of the routine work, creativity felt like a skill worth investing in, because it's the part that's hard to copy.",
    "Outside work I'm a jack of all trades in training: I try to dabble in as many things as I can. Video games are a constant, and so is pixel art, which you might have guessed by now.",
  ],
  howIWork: [
    {
      title: 'With AI, not on autopilot',
      text: "I use AI tools and coding agents every day to get through work faster: prototyping, finding my way around big codebases, automating the boring parts. I still keep my own skills sharp, from design patterns to architecture, so I can tell when the output is wrong.",
    },
    {
      title: 'With an eye for design',
      text: 'I have a decent sense of design and care about how things look and feel, not just whether they work.',
    },
  ],
}
