import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiMessage, setApiMessage] = useState('Loading...')
  const [echoText, setEchoText] = useState('')
  const [serverTime, setServerTime] = useState('')

  useEffect(() => {
    fetch('/api/hello/')
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message || 'API responded')
      })
      .catch(() => {
        setApiMessage('Unable to reach API')
      })
  }, [])

  const handleEcho = () => {
    fetch('/api/echo/?text=Hello%20from%20React')
      .then((response) => response.json())
      .then((data) => {
        setEchoText(data.echo || 'No echo received')
      })
      .catch(() => {
        setEchoText('Echo request failed')
      })
  }

  const handleTime = () => {
    fetch('/api/time/')
      .then((response) => response.json())
      .then((data) => {
        setServerTime(data.server_time || '')
      })
      .catch(() => {
        setServerTime('Time request failed')
      })
  }

  return (
    <div className="App">
      <header>
        <h1>Django + React API</h1>
      </header>
      <main>
        <p>{apiMessage}</p>
        <button type="button" onClick={handleEcho}>
          Send Echo Request
        </button>
        <p>{echoText}</p>
        <button type="button" onClick={handleTime}>
          Get Server Time
        </button>
        <p>{serverTime}</p>
      </main>
    </div>
  )
}

export default App
