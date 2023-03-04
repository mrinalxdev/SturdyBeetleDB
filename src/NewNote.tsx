import React from 'react'
import NoteForm from './NoteForm'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
}

const NewNote = ({onSubmit} : NewNoteProps) => {
  return (
    <> 
        <h1 className="mb-4">New Note</h1>
        <NoteForm />
    </>
  )
}

export default NewNote