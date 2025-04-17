import { useState } from 'react'

import './App.css'

function App() {

  // Initialise the input value
  const [value, setValue] = useState('')
  
  // Initialise the message
  const [message, setMessage] = useState('')

  // handleSubmit event listener
  // e.preventDefault to prevent the page from refreshing
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const rating = Number(value)

    if (rating <= 2 && rating > 0) setMessage('bad review')
    else if (rating <= 4 && rating >= 3) setMessage('neutral review')
    else if (rating == 5) setMessage('excellent review')  
    else setMessage('Submit a number between 1-5')
  }

  return (
    <div>
      <h3>Submit your review using rating from 1 to 5:</h3>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button type="submit">Send</button>
        <p>{message}</p>
      </form>
    </div>
  )
}

export default App
