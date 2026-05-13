import { ImageWithFallback } from '../components/ImageWithFallback'
import { SectionHeader } from '../components/SectionHeader'
import { Stamp } from '../components/Stamp'
import { projects, type Project } from '../data/portfolio'
import { useProjectScroll } from '../hooks/useProjectScroll'

type ProjectCardProps = {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="paper-card project-scroll-card"
      data-project-card={index}
    >
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
        <ImageWithFallback
          src={project.image}
          alt={`${project.title} screenshot`}
          label="project screenshot pending"
          className="project-scroll-shot"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
    </article>
  )
}

export function Projects() {
  const { ref } = useProjectScroll()

  return (
    <section className="section projects-section" id="projects">
      <SectionHeader
        number="02"
        title="Projects"
        subtitle="精选项目"
        note="dossier drawer / archive index"
      />
      <div className="project-scroll-shell" ref={ref} data-reveal>
        <div className="project-card-stage">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
