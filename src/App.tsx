import { useState } from 'react'
import './App.css'

function App() {

  // Initialise the input value
  const [value, setValue] = useState('')
  
  // Backend sentiment prediction
  const [message, setMessage] = useState('')

  // Loading state for API call
  const [loading, setLoading] = useState(false)

  // handleSubmit event listener
  // e.preventDefault to prevent the page from refreshing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    /*const rating = Number(value)

    if (rating <= 2 && rating > 0) setMessage('bad review')
    else if (rating <= 4 && rating >= 3) setMessage('neutral review')
    else if (rating == 5) setMessage('excellent review')  
    else setMessage('Submit a number between 1-5')
  }*/

    if (!value.trim()) {
      setMessage("Please enter some text")
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // Connect to Racti hosted backend
      const response = await fetch('https://cc-2025-backend-third-cloud-computing-2025-stina.2.rahtiapp.fi/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: value }),
      })
    

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMessage(`Sentiment: ${data.prediction}`)
    } catch (error) {
      console.error(error)
      setMessage('Error connecting to sentiment API')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Sentiment Analysis</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your review here"
          rows={6}
          cols={60}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          {loading ? 'Analyzing...' : 'Send'}
        </button>
      </form>
      <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>{message}</p>
    </div>
  )
}

export default App
