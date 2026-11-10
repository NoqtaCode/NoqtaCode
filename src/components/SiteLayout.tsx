import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUp, Menu, X, ArrowUpLeft } from 'lucide-react'
import { SocialLinks } from './SocialLinks'

const links = [
  { to: '/', label: 'الرئيسية', end: true }, { to: '/services', label: 'خدماتنا' },
  { to: '/estimator', label: 'مقدّر التكلفة' },
  { to: '/portfolio', label: 'أعمالنا' }, { to: '/about', label: 'من نحن' },
  { to: '/blog', label: 'المدونة' }, { to: '/faq', label: 'الأسئلة الشائعة' },
]

export function Brand({ light = false }: { light?: boolean }) {
  return <Link className={`brand ${light ? 'brand-light' : ''}`} to="/" aria-label="NoqtaCode — الرئيسية">
    <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="m5 4 8 8-8 8" /><rect x="15" y="14" width="5" height="5" rx=".7" /></svg></span>
    <span className="brand-word">Noqta<span>Code</span></span>
  </Link>
}

export function SiteLayout() {
  const [open, setOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <>
    <a className="skip-link" href="#main">انتقل إلى المحتوى</a>
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand />
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={open} aria-controls="main-nav">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="main-nav" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="التنقل الرئيسي">
          {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
          <Link className="nav-cta" to="/contact">ابدأ مشروعك <ArrowUpLeft size={15} /></Link>
        </nav>
      </div>
    </header>
    <main id="main"><Outlet /></main>
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand-col"><Brand light /><p>حلول رقمية وتجارب تقنية تساعد مشروعك على النمو والتواصل بوضوح.</p></div>
        <div className="footer-links"><span className="footer-label">استكشف</span>{links.slice(1, 5).map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div>
        <div className="footer-cta"><span className="footer-label">لديك فكرة؟</span><p>لنبدأ بتصور واضح للخطوة القادمة.</p><Link to="/contact" className="text-link">تحدث عن مشروعك <ArrowUpLeft size={16} /></Link><SocialLinks className="footer-social-links" /></div>
      </div>
      <div className="container footer-bottom"><span>NoqtaCode · حلول رقمية تصنع الفرق</span><span>صُنع بعناية، وفكرة قابلة للتوسع.</span></div>
    </footer>
    <button className={`back-top ${showTop ? 'visible' : ''}`} aria-label="العودة إلى أعلى الصفحة" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button>
  </>
}
