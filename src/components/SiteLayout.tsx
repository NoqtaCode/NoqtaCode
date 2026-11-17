import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUp, Menu, X, ArrowUpLeft, Moon, Sun } from 'lucide-react'
import { SocialLinks } from './SocialLinks'
import { companyContact } from '../data/contact'

const WHATSAPP_MESSAGE = encodeURIComponent('مرحبًا NoqtaCode، أود الاستفسار عن خدماتكم الرقمية.')

const links = [
  { to: '/', label: 'الرئيسية', end: true }, { to: '/services', label: 'خدماتنا' },
  { to: '/portfolio', label: 'أعمالنا' }, { to: '/about', label: 'من نحن' },
  { to: '/#home-packages', label: 'الباقات', end: true }, { to: '/faq', label: 'الأسئلة الشائعة' },
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('noqtacode-theme')
    return savedTheme === 'dark' ? 'dark' : 'light'
  })
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f6f9f7' : '#090d0b')
    window.localStorage.setItem('noqtacode-theme', theme)
  }, [theme])
  useEffect(() => {
    setOpen(false)
    const targetId = decodeURIComponent(location.hash.slice(1))
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    if (targetId) {
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior, block: 'start' }))
    } else {
      window.scrollTo({ top: 0, behavior })
    }
  }, [location.pathname, location.hash])
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
          {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive && !to.includes('#') ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'التبديل إلى الوضع الداكن' : 'التبديل إلى الوضع الفاتح'} title={theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}>{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}<span>{theme === 'light' ? 'داكن' : 'فاتح'}</span></button>
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
    <div className="fixed-actions">
      <button className={`back-top ${showTop ? 'visible' : ''}`} aria-label="العودة إلى أعلى الصفحة" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button>
      <a
        className="whatsapp-fab"
        href={`https://wa.me/${companyContact.whatsappNumber}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        title="تواصل عبر واتساب"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.882a.5.5 0 0 0 .613.613l6.008-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.498-5.19-1.37l-.372-.214-3.857.95.967-3.738-.234-.384A9.962 9.962 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        <span className="whatsapp-fab-label">واتساب</span>
      </a>
    </div>
  </>
}
