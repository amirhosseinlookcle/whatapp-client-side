import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversation } from "../context/ConversationsProvider";


export default function NewConversationModal({closeModal}) {
  const { contacts } = useContacts();
  const { createConversation } = useConversation();
  const [
    selectedContactIds,
    setSelectedContactIds,
  ] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    createConversation(selectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(id){
    setSelectedContactIds(prevState => {
      if(prevState.includes(id)){
        return prevState.filter(prevId => {
          // check the code
          return id !== prevId
        })
      } else{
        return [...prevState, id]
      }
    })
  }
  return (
    <>
      <Modal.Header closeButton>
        Create Conversation
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => {
            const { id, name } = contact;
            return (
              <Form.Group controlId={id} key={id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactIds.includes(
                    id
                  )}
                  label={name}
                  onChange={() => handleCheckboxChange(id)}
                ></Form.Check>
              </Form.Group>
            );
          })}
          <Button type="submit" className="mt-2">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
