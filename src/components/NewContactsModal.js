import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import { useContacts } from '../context/ContactsProvider'
export default function NewContactsModal({ closeModal }) {
    const idRef = useRef()
    const nameRef = useRef()
    const {createContact} = useContacts()
    function handleSubmit(e) {
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value);
        closeModal()
    }
    return (
        <>
            <Modal.Header closeButton>
                Create Contact
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            id
                        </Form.Label>
                        <Form.Control type='text' ref={idRef} required>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type='text' ref={nameRef} required>

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' className='mt-2'>
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </>
    )
}
