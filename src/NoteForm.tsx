import { React, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Stack, Row, Col, Button } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'

type NoteFormsProps = {
    onSubmit : (data: NoteData) => void
}

const NoteForm = ({ onSubmit }: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags ] = useState<Tag[]>([])


    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags : []
        })
    }
  return (
    <> 
        <Form onSubmit = {handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId = 'title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref = {titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId = 'title'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect value={selectedTags.map(tag => {
                                return { label : tag.label , value: tag.id }
                            })} isMulti/>
                        </Form.Group>
                    </Col>
                </Row>
                    <Form.Group controlId = 'markdown'>
                            <Form.Label>Body</Form.Label>
                            <Form.Control ref={markdownRef} required as="textarea" rows={15}/>
                    </Form.Group>

                    <Stack direction="horizontal" gap = {3}>
                        <Button type="submit" varient = "primary">Save</Button>
                        <Link to = "..">
                            <Button type="button" variant = "outline-secondary">Cancel</Button>
                        </Link>
                    </Stack>
            </Stack>
        </Form>
    
    </>
  )
}

export default NoteForm