import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

const features = [
  {
    title: 'API-first architecture',
    description: 'Build every experience on JSON endpoints and rapidly ship integrations across React and Django.',
  },
  {
    title: 'Scalable design system',
    description: 'Reusable components, consistent spacing, and responsive layouts ready for production.',
  },
  {
    title: 'Secure backend',
    description: 'Start with protected Django views and later extend to auth, user roles, and data access.',
  },
  {
    title: 'Real-time status',
    description: 'Monitor backend connectivity and server time from the web interface in one click.',
  },
]

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    items: ['Basic API demo', 'Responsive landing page', 'Local development support'],
  },
  {
    name: 'Growth',
    price: '$49/mo',
    items: ['Custom endpoints', 'Data model integration', 'Production-ready theme'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact',
    items: ['Advanced workflows', 'Authentication', 'Dedicated support'],
  },
]

function App() {
  const [apiMessage, setApiMessage] = useState('Connecting to Compyuter API...')
  const [serverTime, setServerTime] = useState('Loading…')
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    fetch('/api/hello/')
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message || 'Compyuter API ready')
      })
      .catch(() => {
        setApiMessage('Unable to reach Compyuter API')
      })

    fetch('/api/time/')
      .then((response) => response.json())
      .then((data) => {
        setServerTime(data.server_time || 'Unavailable')
      })
      .catch(() => {
        setServerTime('Unavailable')
      })
  }, [])

  const activeFeatureData = useMemo(() => features[activeFeature], [activeFeature])

  return (
    <div className="app-shell">
      <Header />

      <main className="page-container">
        <section className="hero-block">
          <div className="hero-copy">
            <span className="eyebrow">Compyuter</span>
            <h1>Create modern web apps with React and Django.</h1>
            <p>
              Launch an advanced website with clean design, powerful API connectivity, and a backend-ready structure for future growth.
            </p>
            <div className="hero-buttons">
              <a className="btn btn-primary" href="#features">
                Explore features
              </a>
              <a className="btn btn-secondary" href="#plans">
                View pricing
              </a>
            </div>
          </div>

          <aside className="hero-aside">
            <div className="status-box">
              <p className="status-label">Live backend status</p>
              <h2>{apiMessage}</h2>
              <span>{`Server time: ${serverTime}`}</span>
            </div>
            <div className="metrics-grid">
              <div>
                <p>API endpoints</p>
                <strong>3</strong>
              </div>
              <div>
                <p>Components</p>
                <strong>7</strong>
              </div>
              <div>
                <p>Ready for production</p>
                <strong>Yes</strong>
              </div>
            </div>
          </aside>
        </section>

        <section id="features" className="feature-section">
          <div className="section-header">
            <p className="eyebrow">Capabilities</p>
            <h2>Everything you need for an advanced web presence.</h2>
            <p className="section-copy">
              Compyuter is designed as a polished developer-first experience with a strong foundation for UI, API, and scale.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <button
                type="button"
                key={feature.title}
                className={`feature-item ${index === activeFeature ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <span>{feature.title}</span>
              </button>
            ))}
          </div>

          <div className="feature-detail-card">
            <h3>{activeFeatureData.title}</h3>
            <p>{activeFeatureData.description}</p>
          </div>
        </section>

        <section className="plans-section" id="plans">
          <div className="section-header">
            <p className="eyebrow">Pricing</p>
            <h2>Choose the right path for your project.</h2>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => (
              <article key={plan.name} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <span className="badge">Popular</span>}
                <h3>{plan.name}</h3>
                <p className="plan-price">{plan.price}</p>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button type="button" className="btn btn-plan">
                  Choose {plan.name}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div>
            <h2>Build the next generation of Compyuter apps.</h2>
            <p>
              Use this advanced website as a launchpad for dashboards, automation tools, AI workflow pages, or product experiences.
            </p>
          </div>
          <a href="/" className="btn btn-hero">
            Start building
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
