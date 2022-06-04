import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
const conversationsContex = createContext({
  conversations: [],
  selectedConversation: {},
  createConversation: () => {},
  selectConversationIndex: () => {},
  sendMessage: () => {},
});

export function useConversation() {
  return useContext(conversationsContex);
}

export function ConversationsProvider({ children, id }) {
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const socket = useSocket()
  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const  addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations((prevState) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevState.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      if (madeChange) {
        return newConversations;
      } else {
        return [...prevState, { recipients, messages: [newMessage] }];
      }
    });
  }, [setConversations])

  useEffect(() => {
    if(socket == null) return;
    socket.on('receive-message', addMessageToConversation)
  
    return () => {
      socket.off('receive-message')
    }
  }, [socket, addMessageToConversation])
  

  function sendMessage(recipients, text) {
    socket.emit('send-message', {recipients, text})
    addMessageToConversation({
      recipients,
      text,
      sender: id,
    });
  }
  const formattedConversations = conversations.map((conversation, index) => {
    console.log('conversation', conversation)
    const recipients = conversation.recipients.map((recip) => {
      const contact = contacts.find((contact) => {
        return contact.id === recip;
      });
      const name = (contact && contact.name) || recip;
      return { id: recip, name };
    });
    const messages = conversation.messages.map(msg => {
      const contact = contacts.find((contact) => {
        return contact.id === msg.sender;
      });
      const name = (contact && contact.name) || msg.sender;
      const fromMe = id === msg.sender;
      return {...msg, senderName: name, fromMe} 
    })
    const selected = index === selectedConversationIndex;
    return {
      ...conversation,
      recipients,
      messages,
      selected,
    };
  });
  console.log('formattedConversations', conversations,  formattedConversations)
  return (
    <conversationsContex.Provider
      value={{
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage,
      }}
    >
      {children}
    </conversationsContex.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length != b.length) return false;
  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
}
