import { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpLeft, X, Check, ChevronDown, Compass, Lightbulb, Code2, Layers3, Quote, ExternalLink, Mail, MessageCircle } from 'lucide-react'
import { SiteLayout } from './components/SiteLayout'
import { PageIntro, SectionHeading, CTASection, Breadcrumb } from './components/Shared'
import { ProjectCard } from './components/ProjectCard'
import { WebsitePackageCards } from './components/WebsitePackageCards'
import { SocialLinks } from './components/SocialLinks'
import { services, serviceProcess, digitalSolutionJourney, websitePackages } from './data/services'
import { portfolioProjects } from './data/projects'
import { faqs } from './data/faq'
import { companyContact } from './data/contact'
import type { Project } from './types'

function usePageMeta(title: string, description: string) {
  useEffect(() => { document.title = `${title} | NoqtaCode`; const meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute('content', description) }, [title, description])
}

function DigitalSolutionJourney() {
  const [visibleSteps, setVisibleSteps] = useState<Set<string>>(() => new Set())
  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>('[data-journey-step]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setVisibleSteps(new Set(digitalSolutionJourney.map(step => step.number)))
      return
    }
    const observer = new IntersectionObserver(entries => {
      setVisibleSteps(current => {
        const next = new Set(current)
        entries.forEach(entry => { if (entry.isIntersecting) next.add((entry.target as HTMLElement).dataset.journeyStep ?? '') })
        return next
      })
    }, { threshold: 0.2, rootMargin: '0px 0px -7% 0px' })
    steps.forEach(step => observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return <ol className="journey-list">{digitalSolutionJourney.map((step, index) => {
    const Icon = [Lightbulb, Compass, Layers3, Code2, Check][index]
    return <li key={step.number} data-journey-step={step.number} className={`journey-step ${visibleSteps.has(step.number) ? 'is-visible' : ''}`}>
      <span className="journey-marker" aria-hidden="true"><Icon size={17} /></span>
      <article className="journey-card"><div className="journey-step-label">المرحلة {step.number} <span /> {digitalSolutionJourney.length.toString().padStart(2, '0')}</div><div className="journey-card-main"><div><h3>{step.title}</h3><p>{step.text}</p></div><div className="journey-outcome"><span>النتيجة</span><b><Check size={14} />{step.result}</b></div></div></article>
    </li>
  })}</ol>
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose])
  if (!project) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}><section className="modal project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button className="modal-close" onClick={onClose} aria-label="إغلاق المعاينة"><X size={19} /></button><div className="project-modal-heading"><div><span className="project-category">{project.category} · من أعمالنا</span><h2 id="project-title">{project.title}</h2></div></div><figure className="project-image-frame"><img src={project.previewImage} alt={`معاينة موقع ${project.title}`} /></figure><div className="project-website-link">{project.websiteUrl ? <a href={project.websiteUrl} target="_blank" rel="noreferrer">زيارة الموقع <ExternalLink size={15} /></a> : <span>رابط الموقع سيُضاف لاحقًا <ExternalLink size={15} /></span>}</div></section></div>
}

function Home() {
  usePageMeta('حلول رقمية تصنع الفرق', 'نصمم حلولًا وتجارب رقمية تساعد المشاريع على التواصل والنمو، من المواقع إلى المنصات والتكاملات.')
  return <>
    <section className="hero container">
      <div className="hero-copy">
        <div className="hero-brandline"><span>حلول رقمية وتجارب تقنية</span></div>
        <h1>من نقطة البداية،<br />نصنع <em>حلولًا رقمية</em><br />تصنع الفرق.</h1>
        <p className="hero-lede">نحوّل احتياج مشروعك إلى حل رقمي واضح وعملي. قد يبدأ بموقع إلكتروني، أو يمتد إلى منصة أو تجربة رقمية تناسب أهدافك.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/portfolio">استكشف أعمالنا <ArrowUpLeft size={17} /></Link>
          <Link className="button button-quiet" to="/contact">ابدأ فكرتك <ArrowLeft size={16} /></Link>
        </div>
        <div className="hero-caption"><span className="caption-line" /> مواقع · منصات · تجارب رقمية</div>
      </div>
      <div className="hero-visual" aria-label="معاينة واجهة رقمية">
        <div className="visual-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="code-float code-float-top" aria-hidden="true"><span>const</span> idea <b>=</b> <i>"نقطة البداية"</i></div>
        <div className="code-float code-float-side" aria-hidden="true"><span>&lt;design</span> <i>responsive</i> <b>/&gt;</b></div>
        <div className="hero-window"><div className="window-bar"><div className="window-controls"><i /><i /><i /></div><span className="window-url"><b /> noqta.design</span><span className="window-menu">···</span></div><div className="mock-site"><div className="mock-nav"><span className="mini-brand"><i /> نقطة</span><span>الرئيسية　 خدماتنا　 أعمالنا</span><button>ابدأ مشروعك <ArrowUpLeft size={10} /></button></div><div className="mock-body"><span className="mock-tag">مساحة جديدة للنمو</span><h2>من الفكرة<br /><b>إلى تجربة.</b></h2><p>واجهة تضع مشروعك في المكان الصحيح.</p><span className="mock-link">اكتشف كيف نعمل <ArrowUpLeft size={11} /></span><div className="mock-art"><span className="art-square" /><span className="art-circle" /><span className="art-dot" /><span className="art-code">&lt;/&gt;</span></div></div><div className="mock-footer"><span>فكرة واضحة</span><span>تجربة مدروسة</span><span>تنفيذ متقن</span></div></div></div>
        <div className="float-card float-card-top"><span className="float-icon"><Code2 size={16} /></span><span>من فكرة<br /><b>إلى تجربة</b></span></div>
        <div className="float-card float-card-bottom"><span className="float-pulse" /><span>مصمّم حول<br /><b>احتياجك</b></span><span className="float-plus">+</span></div>
        <span className="visual-index">01 <i /> 03</span>
      </div>
    </section>
    <section className="trust-strip"><div className="container trust-inner"><span>نبني الحلول الرقمية على</span><b>وضوح الاحتياج</b><i /><b>جودة التنفيذ</b><i /><b>اهتمام التفاصيل</b><i /><b>قابلية التطور</b></div></section>
    <section id="home-packages" className="packages-section home-packages-section">
      <div className="container">
        <SectionHeading eyebrow="خدمة المواقع" title="باقات تناسب احتياجك" text="تصميم وتطوير المواقع إحدى حلولنا الرقمية. اختر نقطة البداية الأقرب لمشروعك، وتواصل معنا لمناقشة التفاصيل قبل التنفيذ." link={{ to: '/services#packages', label: 'تفاصيل الباقات' }} />
        <WebsitePackageCards />
      </div>
    </section>
    <section className="section container services-preview"><SectionHeading eyebrow="حلولنا" title="تقنية تخدم فكرتك" text="نختار شكل الحل بحسب الهدف؛ من موقع ويب متكامل إلى تطبيق أو تكامل رقمي عند الحاجة." link={{ to: '/services', label: 'استكشف الحلول' }} /><div className="service-grid home-service-grid">{services.slice(0, 3).map((service, i) => { const Icon = service.icon; return <article className="service-card" key={service.title}><div className="service-icon"><Icon size={20} /></div><span className="service-number">0{i + 1}</span><h3>{service.title}</h3><p>{service.description}</p><Link to="/services" aria-label={`اعرف أكثر عن ${service.title}`} className="card-arrow"><ArrowUpLeft size={17} /></Link></article> })}</div></section>
    <section className="section method-section journey-section"><div className="container"><SectionHeading eyebrow="منهجنا" title="كيف تتحول فكرتك إلى حل رقمي؟" text="من فهم الاحتياج إلى التسليم أو الإطلاق، بخطوات واضحة ومخرجات ملموسة تناسب طبيعة كل حل." /><DigitalSolutionJourney /></div></section>
    <section className="section why-section"><div className="container why-grid"><div><div className="eyebrow"><span /> لماذا NoqtaCode</div><h2>التفاصيل الصغيرة<br />تصنع <em>فرقًا كبيرًا.</em></h2><p>نعطي كل خطوة حقها، من وضوح الفكرة إلى آخر لمسة في التجربة. نبني حلولًا رقمية تساعدك على خدمة جمهورك وتحقيق أهدافك.</p><Link className="text-link" to="/about">تعرّف علينا <ArrowUpLeft size={16} /></Link></div><div className="why-points">{['نبدأ من أهداف مشروعك، لا من قالب جاهز.', 'نوازن بين الجمال وسهولة الاستخدام.', 'نبني أساسًا مرنًا يمكن أن ينمو معك.', 'نهتم بالتفاصيل التي تجعل التجربة متماسكة.'].map((x, i) => <div className="why-point" key={x}><span>0{i + 1}</span><p>{x}</p><Check size={16} /></div>)}</div></div></section>
    <CTASection />
  </>
}

function ServicesPage() {
  usePageMeta('حلولنا الرقمية', 'مجالات رقمية تشمل المواقع والمنصات والتطبيقات وتجربة المستخدم والأتمتة.')
  return <>
    <Breadcrumb current="خدماتنا" />
    <section className="services-hero container">
      <div className="services-hero-copy">
        <div className="eyebrow"><span /> حلول رقمية حسب احتياجك</div>
        <h1>حلول تقنية<br /><em>تبدأ من هدفك.</em></h1>
        <p>نساعدك على اختيار التجربة الرقمية المناسبة لمشروعك. تصميم وتطوير المواقع هو نقطة انطلاقنا الحالية، مع مساحة لحلول أوسع تحددها احتياجات المشروع ونطاقه.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/contact">ابدأ مشروعك <ArrowUpLeft size={17} /></Link>
          <Link className="button button-quiet" to="/portfolio">شاهد نماذجنا <ArrowLeft size={16} /></Link>
        </div>
        <div className="services-hero-note"><span className="hero-note-mark"><Check size={13} /></span><span>مواقع ومنصات · تطبيقات · تكاملات رقمية</span></div>
      </div>
      <div className="services-art" aria-label="معاينة تصورية لموقع متجاوب">
        <div className="services-art-glow" />
        <div className="services-art-ring services-art-ring-one" />
        <div className="services-art-ring services-art-ring-two" />
        <div className="service-browser">
          <div className="service-browser-bar"><span className="browser-dots"><i /><i /><i /></span><span className="browser-address">your-brand.site</span><span className="browser-menu">···</span></div>
          <div className="service-browser-page">
            <div className="service-mock-nav"><b><i /> علامتك</b><span>الرئيسية　 الخدمات　 عن المشروع</span><i className="service-mock-button" /></div>
            <div className="service-mock-main"><span className="service-mock-label">مساحة رقمية تشبهك</span><strong>فكرتك تستحق<br /><em>واجهة أفضل.</em></strong><span className="service-mock-line" /><div className="service-mock-art"><i /><i /><b>ن</b></div><span className="service-mock-cta">اكتشف خدماتنا <ArrowUpLeft size={10} /></span></div>
            <div className="service-mock-footer"><span /> <span /> <span /></div>
          </div>
        </div>
        <div className="service-float-card service-float-top"><span className="service-float-check"><Check size={14} /></span><span>متجاوب مع<br /><b>كل شاشة</b></span></div>
        <div className="service-float-card service-float-bottom"><span className="service-float-code">&lt;/&gt;</span><span>من الفكرة<br /><b>إلى الإطلاق</b></span></div>
        <div className="services-art-caption"><span>01</span><i /> تجربة مصممة حول مشروعك</div>
      </div>
    </section>
    <section className="services-promise container" aria-label="مبادئ الخدمة">
      <span>كل مشروع يبدأ من احتياجه</span><i />
      <b><Layers3 size={15} /> تجربة منظمة</b><i />
      <b><Compass size={15} /> تنقل أوضح</b><i />
      <b><Code2 size={15} /> أساس تقني مناسب</b>
    </section>
    <section id="digital-solutions" className="section container services-catalog">
      <SectionHeading eyebrow="مجالات الحلول" title="مجالات رقمية قابلة للتوسع" text="تشمل توجهاتنا المواقع والمنصات والتطبيقات وتجربة المستخدم والأتمتة. ويُعتمد نطاق التنفيذ لكل حل بعد فهم احتياج المشروع والاتفاق على تفاصيله." />
      <div className="service-grid">{services.map((service, i) => { const Icon = service.icon; return <article className="service-card service-card-large" key={service.title}><div className="service-icon"><Icon size={21} /></div><span className="service-number">0{i + 1}</span><h3>{service.title}</h3><p>{service.description}</p><span className="service-caption">يُحدد ضمن نطاق المشروع</span></article> })}</div>
    </section>
    <section id="packages" className="packages-section">
      <div className="container">
        <SectionHeading eyebrow="خدمة المواقع الإلكترونية" title="باقات تصميم وتطوير المواقع" text="هذه الباقات خاصة ببناء المواقع، وهي إحدى حلولنا الرقمية. أما المنصات والتطبيقات والتكاملات، فيُحدَّد نطاقها بحسب احتياج المشروع." link={{ to: '/services#digital-solutions', label: 'استكشف بقية حلولنا الرقمية' }} />
        <WebsitePackageCards />
        <div className="package-disclaimer"><span className="demo-dot" /><p><b>تفاصيل الباقات:</b> الأسعار المعروضة معتمدة. الدومين والاستضافة مشمولان في كل باقة، وتُحدد مدة التغطية والتجديد عند الاتفاق. حملة باقة 1,500 ر.س تشمل الإعداد والإدارة لمدة شهر، ولا تشمل ميزانية الإعلان المدفوعة للمنصة. المتاجر والتكاملات الإضافية تُحدد بحسب نطاق المشروع.</p></div>
      </div>
    </section>
    <section className="service-outcomes-section">
      <div className="container service-outcomes">
        <div className="service-outcomes-copy"><div className="eyebrow"><span /> ما الذي يتغير؟</div><h2>من صفحات متفرقة<br />إلى تجربة <em>مترابطة.</em></h2><p>نساعدك على ترتيب الرسالة والخدمات، حتى يعرف الزائر أين يبدأ وما الخطوة التالية التي تناسبه.</p><Link to="/contact" className="text-link">ناقش احتياج مشروعك <ArrowUpLeft size={16} /></Link></div>
        <div className="outcome-list">
          {[['01', 'رسالة أسهل للفهم', 'عناوين ومحتوى منظم يساعد الزائر على استيعاب ما تقدمه.'], ['02', 'تصفح مريح على الجوال', 'واجهة تتكيف مع الشاشة وتبقي المعلومات المهمة قريبة.'], ['03', 'مسار واضح للخطوة التالية', 'روابط وأزرار تقود إلى الإجراء المناسب دون تشتيت.']].map(([n, title, body]) => <article className="outcome-row" key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpLeft size={17} /></article>)}
        </div>
      </div>
    </section>
    <section className="section method-section">
      <div className="container"><SectionHeading eyebrow="كيف نتعاون" title="خطوات واضحة من أول حديث" text="تختلف التفاصيل حسب نطاق المشروع؛ وهذه المراحل إطار مرن لتنظيم التعاون." />
        <div className="process-list">{serviceProcess.map(s => <article className="process-row" key={s.number}><span>{s.number}</span><h3>{s.title}</h3><p>{s.text}</p><ArrowUpLeft size={17} /></article>)}</div>
      </div>
    </section>
    <section className="section container deliverables">
      <div className="deliverable-copy"><div className="eyebrow"><span /> مخرجات تتفق عليها</div><h2>تعرف ما ستحصل عليه<br />قبل أن نبدأ.</h2><p>نثبت الصفحات والوظائف والمراجعات والتسليمات في نطاق واضح، ونراجع أي إضافة تحتاجها قبل اعتماد العرض.</p><Link className="text-link" to="/faq">اقرأ إجابات الأسئلة الشائعة <ArrowUpLeft size={15} /></Link></div>
      <div className="deliverable-list">{['تصور وهيكل واضح للصفحات', 'واجهات متجاوبة مع الشاشات المختلفة', 'تنفيذ صفحات الموقع حسب النطاق', 'مراجعة تجربة التصفح والتنقل', 'تسليم منظم للمخرجات المتفق عليها'].map(x => <div key={x}><Check size={15} />{x}</div>)}</div>
    </section>
    <CTASection />
  </>
}

function PortfolioPage() {
  usePageMeta('أعمالنا', 'نماذج من أعمال NoqtaCode في المواقع والحلول الرقمية.')
  const [active, setActive] = useState<Project | null>(null)
  return <><Breadcrumb current="أعمالنا" /><PageIntro eyebrow="من أعمالنا" title={<>حلول رقمية<br /><em>بتجارب تصنع الفرق.</em></>} text="تعرّف على نماذج من أعمالنا في تصميم المواقع والحلول الرقمية. نضيف مشاريع جديدة إلى المعرض مع توسّع أعمالنا؛ اضغط على بطاقة المشروع لزيارة موقعه." /><section className="container demo-banner portfolio-demo-banner"><span className="demo-dot" /><p><b>من أعمال NoqtaCode:</b> المواقع المعروضة من تنفيذنا. اضغط على شعار أي موقع للانتقال إليه، وسنضيف مشاريع أخرى مع توسع أعمالنا.</p></section><section className="section container portfolio-section"><div className="project-grid portfolio-grid">{portfolioProjects.map(p => <ProjectCard key={p.id} project={p} onOpen={setActive} />)}</div></section><CTASection /><ProjectModal project={active} onClose={() => setActive(null)} /></>
}

function AboutPage() {
  usePageMeta('من نحن', 'تعرف على رؤية NoqtaCode في بناء حلول رقمية وتجارب تقنية قابلة للتطور.')
  const values = [{ n: '01', t: 'الجودة', d: 'عناية متواصلة بالتفاصيل من الفكرة حتى آخر اختبار للواجهة.' }, { n: '02', t: 'الوضوح', d: 'تواصل صريح وتوقعات مفهومة في كل خطوة من خطوات التعاون.' }, { n: '03', t: 'الابتكار', d: 'حلول مدروسة تفتح مساحة لأفكار جديدة وتخدم أهداف المشروع.' }, { n: '04', t: 'التطوير المستمر', d: 'تعلم وتحديث متواصلان لمواكبة احتياجات الويب المتغيرة.' }]
  return <><Breadcrumb current="من نحن" /><PageIntro eyebrow="فكرة NoqtaCode" title={<>نؤمن أن لكل فكرة<br /><em>نقطة بداية.</em></>} text="NoqtaCode علامة تقنية تتطلع إلى بناء حلول رقمية وتجارب عملية تساعد المشاريع على التطور والتواصل بوضوح." /><section className="section container about-story"><div className="about-stamp"><span className="stamp-dot" /><span>فكرة<br />تبدأ من<br /><b>نقطة.</b></span><i>NC · 01</i></div><div className="about-story-copy"><div className="eyebrow"><span /> من الرؤية إلى التجربة</div><h2>نصنع حلولًا<br />تليق بأهداف مشروعك.</h2><p>نؤمن أن التقنية تكون أكثر قيمة حين تنطلق من احتياج واضح؛ لذلك نربط بين الفكرة والتصميم والتنفيذ لنصنع تجربة رقمية مفهومة وقابلة للتطور.</p><p>تصميم وتطوير المواقع إحدى خدمات NoqtaCode، إلى جانب توجه أوسع نحو المنصات والتطبيقات والتكاملات الرقمية. ويُحدد نطاق كل حل وإمكانات تنفيذه وفق احتياج المشروع والاتفاق عليه.</p></div></section><section className="section values-section"><div className="container"><SectionHeading eyebrow="قيم نقترحها" title="مبادئ توجه كل تفصيل" text="قيم تشكل طريقة التفكير في المنتج والتجربة، لا مجرد كلمات في صفحة." /><div className="values-grid">{values.map(v => <article className="value-card" key={v.n}><span>{v.n}</span><h3>{v.t}</h3><p>{v.d}</p></article>)}</div></div></section><section className="section container future-note"><div className="future-icon"><Compass size={25} /></div><div><div className="eyebrow"><span /> مساحة للنمو</div><h2>هوية مرنة، وحلول تنمو معك.</h2><p>تبدأ الحلول من احتياج المشروع، وقد تمتد إلى مواقع ومنصات وتطبيقات أو تكاملات ذكية بحسب النطاق وما يتم اعتماده قبل التنفيذ.</p></div></section><CTASection /></>
}

function ContactPage() {
  usePageMeta('تواصل معنا', 'تواصل مع NoqtaCode عبر واتساب أو البريد الإلكتروني.')
  const [searchParams] = useSearchParams()
  const selectedPackage = websitePackages.find((plan) => plan.id === searchParams.get('package'))
  const configuredBrief = searchParams.get('brief') ?? ''
  const configuredType = searchParams.get('kind') ?? ''
  const message = selectedPackage
    ? `مرحبًا NoqtaCode، أود الاستفسار عن ${selectedPackage.name} (${selectedPackage.price.toLocaleString('en-US')} ر.س).`
    : configuredBrief
      ? `مرحبًا NoqtaCode، أود الاستفسار عن ${configuredType || 'مشروع رقمي'}. تفاصيل أولية: ${configuredBrief}`
      : 'مرحبًا NoqtaCode، أود الاستفسار عن خدماتكم الرقمية.'
  const whatsappUrl = `https://wa.me/${companyContact.whatsappNumber}?text=${encodeURIComponent(message)}`
  const emailUrl = `mailto:${companyContact.email}?subject=${encodeURIComponent('استفسار عن خدمات NoqtaCode')}&body=${encodeURIComponent(message)}`
  return <><Breadcrumb current="تواصل معنا" /><PageIntro eyebrow="خلّنا نبدأ" title={<>حدثنا عن<br /><em>فكرتك القادمة.</em></>} text="اختر وسيلة التواصل المناسبة، وابدأ الحديث معنا عن مشروعك أو استفسارك." /><section className="section container contact-layout"><aside className="contact-aside"><div className="contact-aside-mark"><span>نقطة البداية</span><ArrowUpLeft size={25} /></div><h2>خطوتك الأولى<br />تبدأ من <em>هنا.</em></h2><p>تواصل معنا مباشرة عبر واتساب أو البريد الإلكتروني، وسنكون سعداء بالتعرف على فكرتك.</p><div className="contact-aside-note"><span className="demo-dot" />تُرسل رسالتك بعد مراجعتها وتأكيدها في تطبيق التواصل.</div></aside><div className="contact-form contact-channels"><div className="form-heading"><h2>تواصل مباشرة</h2><span>اختر القناة المناسبة لك</span></div>{selectedPackage && <div className="selected-package-note"><span>استفسارك عن الباقة</span><b>{selectedPackage.name} · {selectedPackage.price.toLocaleString('en-US')} ر.س</b><small>{selectedPackage.title} — {selectedPackage.pages}</small></div>}{configuredBrief && <div className="selected-config-note"><span>تفاصيل التصور الأولي</span><b>{configuredType}</b><p>{configuredBrief}</p></div>}<div className="contact-channel-list"><a className="contact-channel" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="تواصل مع NoqtaCode عبر واتساب"><span className="contact-channel-icon"><MessageCircle size={20} /></span><span className="contact-channel-copy"><small>واتساب الشركة</small><strong>ابدأ محادثة</strong><span>افتح محادثة برسالة جاهزة</span></span><ArrowUpLeft size={17} /></a><a className="contact-channel" href={emailUrl}><span className="contact-channel-icon"><Mail size={20} /></span><span className="contact-channel-copy"><small>البريد الإلكتروني</small><strong dir="ltr">{companyContact.email}</strong><span>افتح رسالة جديدة إلى بريدنا</span></span><ArrowUpLeft size={17} /></a></div><p className="contact-channel-note">لن تُرسل أي رسالة تلقائيًا. سينقلك الرابط إلى واتساب أو تطبيق البريد لتراجع رسالتك وترسلها بنفسك.</p><div className="contact-social-block"><h3>تابعنا على منصات التواصل</h3><SocialLinks className="contact-social-links" /></div></div></section></>
}

function FAQPage() {
  usePageMeta('الأسئلة الشائعة', 'إجابات عملية حول تصميم وتطوير المواقع وخطوات التعاون.')
  const [open, setOpen] = useState<number | null>(0)
  return <><Breadcrumb current="الأسئلة الشائعة" /><PageIntro eyebrow="إجابات واضحة" title={<>أسئلة تتكرر،<br /><em>وإجابات مباشرة.</em></>} text="جمعنا إجابات تساعدك على فهم خطوات تصميم وتطوير الموقع وما يحتاجه المشروع قبل البدء." /><section className="section container faq-layout"><div className="faq-aside"><div className="faq-aside-icon"><Quote size={23} /></div><h2>هل لديك سؤال<br />لم تجده هنا؟</h2><p>يساعدنا فهم احتياجك على تحديد الإجابة المناسبة لمشروعك.</p><Link to="/contact" className="text-link">أخبرنا عن سؤالك <ArrowUpLeft size={15} /></Link></div><div className="faq-list">{faqs.map((item, i) => <article className={`faq-item ${open === i ? 'faq-open' : ''}`} key={item.question}><h3><button id={`faq-trigger-${i}`} aria-expanded={open === i} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{item.question}</span><span className="faq-toggle"><ChevronDown size={17} /></span></button></h3><div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-trigger-${i}`} hidden={open !== i} className="faq-answer"><p>{item.answer}</p></div></article>)}</div></section><CTASection /></>
}

function NotFound() {
  usePageMeta('الصفحة غير موجودة', 'الصفحة التي تبحث عنها غير موجودة.')
  return <section className="not-found container"><span className="not-found-code">404</span><div className="eyebrow"><span /> يبدو أننا ابتعدنا عن النقطة</div><h1>هذه الصفحة<br /><em>غير موجودة.</em></h1><p>ربما تغير الرابط أو لم يعد متاحًا. لنعد إلى مساحة مألوفة.</p><Link to="/" className="button button-primary">العودة للرئيسية <ArrowUpLeft size={16} /></Link></section>
}

export default function App() {
  return <Routes><Route element={<SiteLayout />}><Route index element={<Home />} /><Route path="services" element={<ServicesPage />} /><Route path="portfolio" element={<PortfolioPage />} /><Route path="about" element={<AboutPage />} /><Route path="contact" element={<ContactPage />} /><Route path="faq" element={<FAQPage />} /><Route path="configurator" element={<Navigate to="/services" replace />} /><Route path="*" element={<NotFound />} /></Route></Routes>
}
