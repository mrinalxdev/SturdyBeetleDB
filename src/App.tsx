import { useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import {Routes, Route, Navigate} from "react-router-dom"
import NewNote from './NewNote'
import {v4 as uuidV4} from "uuid"

import { useLocalStorage } from './useLocalStorage'


export type Note = {
  id : string
} & NoteData


export type RawNote = {
  id : string
}

export type RawNoteData = {
  title : string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title : string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id : string
  label : string
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote( { tags, ...data }: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagsIds: tags.map(tag => tag.id) }]
    })
  }
 
  return (

    <Container className='my-4'>
      <Routes>
        <Route path = '/' element = {<h1>Home</h1>}/>
        <Route path = '/new' element = { <NewNote onSubmit={onCreateNote} /> }/>
        <Route path='/:id' element={<Navigate to="/" />}>
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
    
  )
}

export default App
