import React from 'react'
import NoteForm from './NoteForm'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NewNote = ({ onSubmit, onAddTag, availableTags } : NewNoteProps) => {
  return (
    <> 
        <h1 className="mb-4">New Note</h1>
        <p>Create your new note here. By filling the following blanks.</p>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}

export default NewNote