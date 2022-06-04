import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import { useConversation } from "../context/ConversationsProvider";

export default function OpenConversaiton() {
  const [text, setText] = useState("");
  const messageInput = useRef()
  const setRef = useCallback(node => {
    if(node){
      node.scrollIntoView({ smooth: true });

    }

  }, [])
  const { sendMessage, selectedConversation } = useConversation();
  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.id),
      text
    );
    setText("");
     messageInput.current.focus();

  }


  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className=" d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? "align-self-end align-items-end" : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form className="m-2" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Form.Control
              ref={messageInput}
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            ></Form.Control>
            <Button type="submit">Send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}
