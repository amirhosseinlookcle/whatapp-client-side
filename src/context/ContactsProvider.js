import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
const contactsContex = createContext({
  contacts: [],
  createContact: () => {}
});

export function useContacts(){ 
  return useContext(contactsContex)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage(
    "contacts",
    []
  );
  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }
  return (
    <contactsContex.Provider 
      value={{ contacts, createContact }}
    >
      {children}
    </contactsContex.Provider>
  );
}
