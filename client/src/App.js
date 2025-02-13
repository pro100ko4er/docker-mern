import {useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import {List} from './List'
import {Form} from './Form'


const baseAPI = axios.create({baseURL: 'http://localhost:5000'})

function App() {
  const [notes, setNotes] = useState([])

  async function createNote(text) {
    const note = await baseAPI.post('/api/note', {text})
    setNotes([...notes, {...note.data.note}])
  }

  const fetchNotes = useCallback(async () => {
    const notes = await baseAPI.get('/api/note')
    setNotes(notes.data)
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return (
    <>
      <nav className="navbar">
        <h3>Docker MERN</h3>
      </nav>
      <div className="container with-nav">
        <Form onCreate={createNote} />
        <List list={notes} />
      </div>
    </>
  )
}

export default App;
