import React, { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [misspelledWords, setMisspelledWords] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Will set 'inputText' to the value entered by the user inside the text box
  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  // Will send a GET request to run the spellcheck on the user's input (inputText), the state of misspelledWords will be updated with a list of 
  // all the misspelled words returned by the spellcheck. If the misspelledWords state is empty, it means there are no mispelled words, 
  // else, it will display all the misspelled words on screen.
  const handleFormSubmit = (event) => {
    event.preventDefault() // prevent submit button from reloading page
    
    // if text box is empty, display error message
    if (inputText.trim() === ''){
      setErrorMessage(<h3 style={{ color: 'red' }}>Please enter some text.</h3>)
      return
    }
    setLoading(true) // display loading animation after hitting submit
    setErrorMessage('') // reset error message so user don't have to press clear after error message is shown

    fetch(`/spellcheck?text=${inputText}`)
      .then(response => response.json())
      .then(data => { 
        if (data.misspelled_words !== undefined) { 
          setMisspelledWords(data.misspelled_words)
        } else {
          setMisspelledWords([])
        }
        // makes sure result message appears only after user hits submit button
        setSubmitted(true)
        // remove loading message after data is returned
        setLoading(false)
      })
      .catch(error => console.error(error))
  }

  // clear input
  const handleClear = () => {
    setInputText('')
    setMisspelledWords([])
    setSubmitted(false)
    setErrorMessage('')
  }

  return (
    <div className="app-container">
      <h1 className="title">Spell Checker</h1>
      <form onSubmit={handleFormSubmit}>
        <label className="EnterTextLabel">
          Enter text:
          <textarea
            className="inputBox"
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
        </label>
        <div className='eng'>Note: This spell checker only works in English.</div>
        <button type="submit">Check spelling</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <div>
          {errorMessage ? (
            <div style={{color:'red'}}>{errorMessage}</div>
          ) : misspelledWords.length > 0 ? (
            <div>
              <h3 style={{ color: 'red' }}>Misspelled words:</h3>
              <ul>
                {misspelledWords.map((word, index) => (<li key={index}>{word}</li>))}
              </ul>
            </div>
          ) : submitted ? (
            <h3 style={{ color: 'green' }}>All correct!</h3>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default App
