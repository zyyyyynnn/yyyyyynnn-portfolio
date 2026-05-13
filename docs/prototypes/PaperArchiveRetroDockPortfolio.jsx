import { terminalLines, projects, landscapes, contact } from '../../src/data/portfolio'

const navItems = [
  ['01', 'Home', '#home'],
  ['02', 'Projects', '#projects'],
  ['03', 'Photos', '#photos'],
  ['04', 'About', '#about'],
  ['05', 'Contact', '#contact'],
]

export function PaperArchiveRetroDockPortfolioPrototype() {
  return (
    <main className="site-shell">
      <nav className="site-nav">
        <a className="brand" href="#home">yyyyyynnn</a>
        <div className="nav-links">
          {navItems.map(([id, label, href]) => <a href={href} key={id}><span>{id}</span>{label}</a>)}
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">01 Home / Clean Light Paper Archive</p>
          <h1>I ship code,<br />I catch light.</h1>
          <p>写代码，也记录光线落下来的方式。</p>
        </div>
        <div className="hero-stack" data-reveal>
          <div className="kraft-slab" />
          <div className="retro-computer">terminal docks into the screen</div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <h2>02 Projects</h2>
        <div className="project-scroll-shell" data-reveal>
          {projects.map((project) => (
            <article className="paper-card project-scroll-card" key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.cn}</p>
              <p>{project.desc}</p>
              <div>{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section photos-section" id="photos">
        <h2>03 Landscape Photography</h2>
        <div className="photo-board" data-reveal>
          {landscapes.map((landscape) => <img src={landscape.image} alt={landscape.city} key={landscape.id} />)}
        </div>
      </section>

      <section className="section about-section" id="about">
        <h2>04 About</h2>
        <article className="paper-card">在校生，写代码，也用手机记录一些光线、城市和日常切片。</article>
      </section>

      <section className="section contact-section" id="contact">
        <h2>05 Contact</h2>
        <article className="paper-card">
          <a href={`mailto:${contact.primaryEmail}`}>{contact.primaryEmail}</a>
          <a href={contact.github}>{contact.githubLabel}</a>
        </article>
      </section>

      <pre hidden>{terminalLines.join('\n')}</pre>
    </main>
  )
}
