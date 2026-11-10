import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpLeft, Calculator, Check, Info, Minus, Plus } from 'lucide-react'
import { additionalPageRange, estimateFeatures, estimateProjectTypes } from '../data/estimator'

const formatPrice = (value: number) => value.toLocaleString('en-US')

export function ProjectCostEstimator() {
  const [projectType, setProjectType] = useState<(typeof estimateProjectTypes)[number]['id']>('company')
  const [pageCount, setPageCount] = useState(4)
  const [features, setFeatures] = useState<string[]>([])
  const estimate = useMemo(() => {
    const type = estimateProjectTypes.find(item => item.id === projectType) ?? estimateProjectTypes[0]
    const overage = Math.max(0, pageCount - type.includedPages)
    const selectedFeatures = estimateFeatures.filter(feature => features.includes(feature.id))
    return {
      type,
      min: type.base + overage * additionalPageRange.min + selectedFeatures.reduce((total, feature) => total + feature.min, 0),
      max: type.base + overage * additionalPageRange.max + selectedFeatures.reduce((total, feature) => total + feature.max, 0),
      selectedFeatures,
    }
  }, [features, pageCount, projectType])

  const toggleFeature = (id: string) => setFeatures(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const brief = `نوع الموقع: ${estimate.type.label}، عدد الصفحات: ${pageCount}، الميزات المطلوبة: ${estimate.selectedFeatures.map(feature => feature.label).join('، ') || 'لا توجد إضافات محددة'}، والنطاق التقديري ${formatPrice(estimate.min)}–${formatPrice(estimate.max)} ر.س.`
  const contactUrl = `/contact?brief=${encodeURIComponent(brief)}&kind=${encodeURIComponent(estimate.type.label)}`

  return <section className="section container estimator-layout" aria-label="إعداد تقدير تكلفة المشروع">
    <div className="estimator-controls">
      <fieldset className="estimator-fieldset"><legend>نوع الموقع</legend><div className="estimator-type-options">{estimateProjectTypes.map(type => <button key={type.id} type="button" className={`estimator-type-option ${projectType === type.id ? 'selected' : ''}`} aria-pressed={projectType === type.id} onClick={() => { setProjectType(type.id); setPageCount(type.includedPages) }}><b>{type.label}</b><small>يبدأ من {formatPrice(type.base)} ر.س · يشمل {type.includedPages} صفحات</small>{projectType === type.id && <Check size={15} />}</button>)}</div></fieldset>
      <fieldset className="estimator-fieldset"><legend>عدد صفحات الموقع</legend><div className="page-count-control"><div className="page-count-stepper"><button type="button" aria-label="تقليل عدد الصفحات" disabled={pageCount <= 1} onClick={() => setPageCount(count => Math.max(1, count - 1))}><Minus size={16} /></button><output aria-live="polite" aria-label={`${pageCount} صفحات`}>{pageCount}<small>صفحات</small></output><button type="button" aria-label="زيادة عدد الصفحات" disabled={pageCount >= 20} onClick={() => setPageCount(count => Math.min(20, count + 1))}><Plus size={16} /></button></div><input type="range" min="1" max="20" value={pageCount} aria-label="عدد صفحات الموقع" onChange={event => setPageCount(Number(event.target.value))} /><span>يتغير التقدير حسب الصفحات الإضافية المطلوبة.</span></div></fieldset>
      <fieldset className="estimator-fieldset"><legend>ميزات إضافية</legend><p className="estimator-hint">اختر ما تتوقع احتياجه، وسيتحدث النطاق تلقائيًا.</p><div className="estimator-feature-list">{estimateFeatures.map(feature => <label key={feature.id} className={`estimator-feature ${features.includes(feature.id) ? 'selected' : ''}`}><input type="checkbox" checked={features.includes(feature.id)} onChange={() => toggleFeature(feature.id)} /><span className="estimator-checkbox">{features.includes(feature.id) && <Check size={12} />}</span><span className="estimator-feature-copy"><b>{feature.label}</b><small>إضافة تقديرية: {formatPrice(feature.min)}–{formatPrice(feature.max)} ر.س</small></span></label>)}</div></fieldset>
    </div>
    <aside className="estimate-result" aria-live="polite" aria-label="نتيجة التقدير المبدئي">
      <div className="estimate-result-top"><span className="estimate-icon"><Calculator size={20} /></span><span>نطاق تقديري</span></div>
      <div className="estimate-type-label">{estimate.type.label} · {pageCount} صفحات</div><div className="estimate-amount"><strong>{formatPrice(estimate.min)}–{formatPrice(estimate.max)}</strong><span>ر.س</span></div><p className="estimate-range-note">نطاق مبدئي للمقارنة وتوضيح الاحتياج.</p>
      <div className="estimate-includes"><b>حسب اختياراتك</b><ul><li><Check size={14} />يشمل أساس الموقع حتى {estimate.type.includedPages} صفحات.</li>{estimate.selectedFeatures.map(feature => <li key={feature.id}><Check size={14} />{feature.label}</li>)}</ul></div>
      <div className="estimate-disclaimer"><Info size={16} /><p><b>تنبيه:</b> يعتمد هذا التقدير على الأسعار المعتمدة والاختيارات المحددة. يُثبت السعر النهائي بعد مراجعة نطاق المشروع.</p></div>
      <Link to={contactUrl} className="button button-primary estimate-cta">تابع للتواصل <ArrowUpLeft size={16} /></Link><small className="estimate-future-note">سنجهّز رسالة تتضمن تقديرك واختياراتك. راجعها وأرسلها بنفسك عبر واتساب أو البريد.</small>
    </aside>
  </section>
}
