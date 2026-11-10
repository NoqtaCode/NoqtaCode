import type { Project } from '../types'
import { ExternalLink } from 'lucide-react'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const cardContent = <><span className={`project-image-frame ${project.logoImage ? 'project-logo-frame' : ''}`}><img src={project.logoImage ?? project.previewImage} alt={project.logoImage ? `شعار موقع ${project.title}` : `صورة معاينة لموقع ${project.title}`} loading="lazy" /></span><span className="project-meta"><span className="project-category">{project.category}</span><span className="project-card-title">{project.title}</span><span className="project-card-summary">{project.summary}</span></span></>
  return <article className="project-card">
    {project.websiteUrl
      ? <a className="project-card-link" href={project.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`زيارة موقع ${project.title}، يفتح في نافذة جديدة`}>{cardContent}</a>
      : <button className="project-card-button" onClick={() => onOpen(project)} aria-label={`افتح معاينة مشروع ${project.title}`}>{cardContent}</button>}
    <div className="project-website-link">{project.websiteUrl ? <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">زيارة الموقع <ExternalLink size={14} /></a> : <span>رابط الموقع سيُضاف لاحقًا <ExternalLink size={14} /></span>}</div>
  </article>
}
