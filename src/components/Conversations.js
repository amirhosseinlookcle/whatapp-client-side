import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversation } from "../context/ConversationsProvider";

export default function Conversatons() {
  const { conversations, selectConversationIndex } = useConversation();
  return (
    <ListGroup variant="flush">
      {conversations.map(
        (conversation, index) => {
          const { recipients } = conversation;
          return (
            <ListGroup.Item
              key={index}
              action
              active={conversation.selected}
              onClick={() => selectConversationIndex(index)}
            >
              {conversation.recipients
                .map((recip) => recip.name)
                .join(",")}
            </ListGroup.Item>
          );
        }
      )}
    </ListGroup>
  );
}
