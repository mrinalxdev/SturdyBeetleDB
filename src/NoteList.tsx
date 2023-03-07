import { React, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Stack, Button, Form } from 'react-bootstrap'
import ReactSelect from 'react-select'
import { Tag, Note } from './App'

type NoteListProps = {
    availableTags: Tags[]
    notes: SimplifiedNote[]
}

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

const NoteList = ({availableTags, notes}: NoteListProps) => {
    const [selectedTags, setSelectedTags ] = useState<Tag[]>([])
    const [title, setTitle ] = useState("")


    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.lenght === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])

  return (
    <> 
    <Row className = "align-items-center mb-4">
        <Col><h1>NotesWizz</h1></Col>
        <Col xs='auto'>
            <Stack gap={2} direction='horizontal'>
                <Link to='/new'>
                    <Button variant='primary'>Create</Button>
                </Link>
                <Button variant='outline-secondary'>Edit Tags</Button>
            </Stack>
        </Col>
    </Row>

    <Form>
        <Row className='mb-4'>
            <Col>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={title}
                    onChange ={
                        e=> setTitle(e.target.value)
                    }
                    />
                    
                </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId = 'tags'>
                     <Form.Label>Tags</Form.Label>
                        <ReactSelect 
                            value={selectedTags.map(tag => {
                                return { label : tag.label , value: tag.id }
                            })}
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id}
                            })}
                            onchange = {tags => {
                                setSelectedTags(tags.map(tag => {
                                    return { label: tag.label, id: tag.value}
                                }))
                            }}
                         isMulti/>
             </Form.Group>        
            </Col>
        </Row>
    </Form>
    
    <Row xs ={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
            <Col key={note.id}> 
                <NoteCard id={note.id} title={node.title} tags={note.tags}/>
            </Col>
        ))}

    </Row>

    
    </>
  )
}

function NoteCard({id, title, tags}: SimplifiedNote) {

}

export default NoteList