import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowUpLeft, Sparkles } from 'lucide-react'

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return <section className="page-intro container"><div className="eyebrow"><span />{eyebrow}</div><h1>{title}</h1><p>{text}</p></section>
}

export function SectionHeading({ eyebrow, title, text, link }: { eyebrow: string; title: string; text?: string; link?: { to: string; label: string } }) {
  return <div className="section-heading"><div><div className="eyebrow"><span />{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>{link && <Link className="text-link heading-link" to={link.to}>{link.label}<ArrowUpLeft size={16} /></Link>}</div>
}

export function CTASection() {
  return <section className="cta-section container"><div className="cta-panel"><div className="cta-decoration"><span /><span /><span /></div><div className="eyebrow"><Sparkles size={14} /> الخطوة التالية</div><h2>فكرتك تستحق حضورًا<br className="desktop-break" /> رقميًا يليق بها.</h2><p>أخبرنا عن مشروعك، ولنبدأ من احتياجك الحقيقي.</p><Link className="button button-primary" to="/contact">ابدأ محادثة <ArrowUpLeft size={17} /></Link></div></section>
}

export function Breadcrumb({ current }: { current: string }) { return <div className="breadcrumb container"><Link to="/">الرئيسية</Link><ArrowLeft size={13} /><span>{current}</span></div> }
