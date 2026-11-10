import { ArrowUpLeft } from 'lucide-react'
import { socialProfiles } from '../data/contact'

function SocialIcon({ id }: { id: (typeof socialProfiles)[number]['id'] }) {
  if (id === 'facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.6V3.7c-.8-.1-1.6-.2-2.5-.2-2.4 0-4.1 1.5-4.1 4.3v2.1H7.4V13h2.7v8h3.4Z" /></svg>
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 5.8a5.1 5.1 0 0 0 3.3 1.2v3.4a8.4 8.4 0 0 1-4.8-1.5v6.2a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.5a2.7 2.7 0 1 0 1.9 2.6V2h3.4c.2 1.6.6 2.9 1.1 3.8Z" /></svg>
}

export function SocialLinks({ className = '' }: { className?: string }) {
  return <div className={`social-links ${className}`.trim()} aria-label="حسابات NoqtaCode الاجتماعية">
    {socialProfiles.map(profile => <a className="social-link" href={profile.href} key={profile.id} target="_blank" rel="noopener noreferrer" aria-label={`صفحة NoqtaCode على ${profile.label} — تفتح في نافذة جديدة`}>
      <span className="social-icon"><SocialIcon id={profile.id} /></span><span>{profile.label}</span><ArrowUpLeft size={13} />
    </a>)}
  </div>
}
