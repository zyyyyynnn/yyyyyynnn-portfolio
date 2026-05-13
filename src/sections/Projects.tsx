import { ImageWithFallback } from '../components/ImageWithFallback'
import { SectionHeader } from '../components/SectionHeader'
import { Stamp } from '../components/Stamp'
import { projects, type Project } from '../data/portfolio'
import { useProjectScroll } from '../hooks/useProjectScroll'

type ProjectCardProps = {
  project: Project
  index: number
  active: boolean
}

function ProjectCard({ project, index, active }: ProjectCardProps) {
  return (
    <article
      className={`paper-card project-scroll-card ${active ? 'active' : ''}`}
      data-project-card={index}
    >
      <span className="folder-tab" aria-hidden="true" />
      <span className="project-folder-base" aria-hidden="true" />
      <div className="project-ruler" />
      <Stamp>{project.id}</Stamp>
      <div className="project-scroll-copy">
        <p className="eyebrow">Project Archive / {project.id}</p>
        <h3>{project.title}</h3>
        <p className="project-cn">{project.cn}</p>
        <p className="project-desc">{project.desc}</p>
        <div className="stack-tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="project-link" href={`https://${project.repo}`} aria-label={`Open ${project.title} GitHub`}>
          {project.repo} ↗
        </a>
      </div>
      <div className="project-visual-wrap">
        <span className="photo-tape" aria-hidden="true" />
        <ImageWithFallback
          src={project.image}
          alt={`${project.title} screenshot`}
          label="project screenshot pending"
          className="project-scroll-shot"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="project-screen-lines" />
      </div>
    </article>
  )
}

export function Projects() {
  const { ref, activeIndex } = useProjectScroll(projects.length)

  return (
    <section className="section projects-section" id="projects">
      <SectionHeader
        number="02"
        title="Projects"
        subtitle="精选项目"
        note="dossier drawer / archive index"
      />
      <div className="project-scroll-shell" ref={ref} data-reveal>
        <div className="project-scroll-stage">
          <aside className="project-index-panel">
            <p className="eyebrow">Current Project</p>
            <div className="project-counter">{String(activeIndex + 1).padStart(2, '0')}</div>
            <div className="project-track">
              {projects.map((project, index) => (
                <div
                  className={`project-track-item ${activeIndex === index ? 'active' : ''}`}
                  key={project.id}
                >
                  <span>{project.id}</span>
                  <strong>{project.title}</strong>
                </div>
              ))}
            </div>
          </aside>
          <div className="project-card-stage" aria-live="polite">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                active={activeIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
