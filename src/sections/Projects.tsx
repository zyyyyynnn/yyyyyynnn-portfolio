import type { CSSProperties } from 'react'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { SectionHeader } from '../components/SectionHeader'
import { Stamp } from '../components/Stamp'
import { projects, type Project } from '../data/portfolio'
import { useProjectScroll } from '../hooks/useProjectScroll'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

type ProjectCardProps = {
  project: Project
  index: number
  activeRaw: number
}

function ProjectCard({ project, index, activeRaw }: ProjectCardProps) {
  const distance = index - activeRaw
  const isPast = distance < 0
  const y = isPast ? distance * 34 : distance * 32
  const rotate = isPast ? clamp(distance * 2.2, -3.5, 0) : clamp(distance * 1.5, 0, 2.6)
  const scale = 1 - Math.min(Math.abs(distance), 1.4) * 0.032
  const opacity =
    distance < -0.8
      ? Math.max(0.24, 1.28 + distance)
      : distance > 1.18
        ? Math.max(0.28, 1.58 - distance)
        : 1
  const blur = Math.abs(distance) > 0.9 ? Math.min(Math.abs(distance) * 0.8, 1.2) : 0

  return (
    <article
      className="paper-card project-scroll-card"
      data-project-card={index}
      style={
        {
          zIndex: 20 - Math.round(Math.abs(distance) * 4) + index,
          opacity,
          filter: `blur(${blur}px)`,
          transform: `translate3d(0, ${y}%, 0) rotate(${rotate}deg) scale(${scale})`,
        } as CSSProperties
      }
    >
      <span className="folder-tab" aria-hidden="true" />
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
        <p className="hand-note project-note">{project.note}</p>
      </div>
      <div className="project-visual-wrap">
        <span className="photo-tape" aria-hidden="true" />
        <ImageWithFallback
          src={project.image}
          alt={`${project.title} screenshot`}
          label="project screenshot pending"
          className="project-scroll-shot"
        />
        <div className="project-screen-lines" />
      </div>
    </article>
  )
}

export function Projects() {
  const { ref, progress } = useProjectScroll(projects.length)
  const activeRaw = progress * (projects.length - 1)
  const activeIndex = Math.round(activeRaw)

  return (
    <section className="section projects-section" id="projects">
      <SectionHeader
        number="02"
        title="Projects"
        subtitle="精选项目"
      note="scroll cards / project archive"
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
            <p className="hand-note">
              previous card pulls away,
              <br />
              next archive appears.
            </p>
          </aside>
          <div className="project-card-stage" aria-live="polite">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                activeRaw={activeRaw}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
