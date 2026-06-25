import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [apiMessage, setApiMessage] = useState('Loading Compyuter...')
  const [serverTime, setServerTime] = useState('')

  useEffect(() => {
    fetch('/api/hello/')
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message || 'Welcome to Compyuter')
      })
      .catch(() => {
        setApiMessage('Unable to reach the backend API')
      })

    fetch('/api/time/')
      .then((response) => response.json())
      .then((data) => {
        setServerTime(data.server_time || '')
      })
      .catch(() => {
        setServerTime('Server time unavailable')
      })
  }, [])

  return (
    <div className="app-shell">
      <Header />
      <main className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Compyuter</p>
          <h1>Your AI-powered web assistant</h1>
          <p className="hero-text">
            Build smarter workflows, automate tasks, and connect React with Django API services in one modern web experience.
          </p>
          <div className="hero-actions">
            <a href="#features" className="primary-button">
              Explore features
            </a>
            <a href="#status" className="secondary-button">
              API status
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="status-card">
            <h2>Backend status</h2>
            <p>{apiMessage}</p>
            <span>{serverTime ? `Server time: ${serverTime}` : 'Loading server time...'}</span>
          </div>
        </div>
      </main>

      <section id="features" className="features-grid">
        <div className="feature-card">
          <h3>Fast API integration</h3>
          <p>Connect React UI with Django endpoints effortlessly using Vite proxying and JSON routes.</p>
        </div>
        <div className="feature-card">
          <h3>Modern UI</h3>
          <p>Responsive design with clean typography, accessible components, and meaningful calls to action.</p>
        </div>
        <div className="feature-card">
          <h3>Data-ready</h3>
          <p>Start with simple endpoints and scale to real data models, authentication, and AI-driven features.</p>
        </div>
      </section>

      <section className="about-section">
        <div>
          <h2>What is Compyuter?</h2>
          <p>
            Compyuter is a web platform prototype that blends Django backend services with a React frontend. It provides a foundation for building intelligent tooling, dashboards, and interactive data apps.
          </p>
        </div>
        <div>
          <h2>How it works</h2>
          <p>
            The React client calls Django APIs at <code>/api/*</code>. Vite proxies requests during development so you can work locally without CORS configuration.
          </p>
        </div>
      </section>

      <section id="status" className="contact-section">
        <h2>Get started</h2>
        <p>
          Run the backend with <code>python manage.py runserver</code> and the frontend with <code>npm run dev</code>.
        </p>
      </section>

      <Footer />
    </div>
  )
}

export default App
