import React from 'react'
import { Form, Stack, Row, Col, Button } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'

const NoteForm = () => {
  return (
    <> 
        <Form>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId = 'title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId = 'title'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti/>
                        </Form.Group>
                    </Col>
                </Row>
                    <Form.Group controlId = 'markdown'>
                            <Form.Label>Body</Form.Label>
                            <Form.Control required as="textarea" rows={15}/>
                    </Form.Group>

                    <Stack direction="horizontal" gap = {3}>
                        <Button type="submit" varient = "primary">Save</Button>
                        <Button type="button" variant = "outline-secondary">Cancel</Button>
                    </Stack>
            </Stack>
        </Form>
    
    </>
  )
}

export default NoteForm