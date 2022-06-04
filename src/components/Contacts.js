import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => {
        const { id, name } = contact;
        return (
          <ListGroup.Item key={id}>
            {name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
