import { Link } from 'react-router-dom'
import { ArrowUpLeft, Check, Layers3 } from 'lucide-react'
import { websitePackages } from '../data/services'

export function WebsitePackageCards() {
  return <div className="package-grid">
    {websitePackages.map((plan) => <article key={plan.id} className={`package-card ${plan.featured ? 'package-featured' : ''}`}>
      {plan.featured && <span className="package-badge">الخيار المتوازن</span>}
      <div className="package-name">{plan.name}</div>
      <h3>{plan.title}</h3>
      <p className="package-description">{plan.description}</p>
      <div className="package-price"><strong>{plan.price.toLocaleString('en-US')}</strong><span>ر.س</span><small>سعر الباقة</small></div>
      <div className="package-pages"><Layers3 size={15} />{plan.pages}</div>
      <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
      {plan.note && <div className="package-note">{plan.note}</div>}
      <Link className={plan.featured ? 'button button-primary package-cta' : 'button button-outline package-cta'} to={`/contact?package=${plan.id}`}>استفسر عن الباقة <ArrowUpLeft size={16} /></Link>
    </article>)}
  </div>
}
