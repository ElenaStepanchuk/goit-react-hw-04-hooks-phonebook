import Form from "./Form";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactsList from "./ContactsList";
import Filter from "./Filter";

const AddContacts = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    setContacts(parsedContacts);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filterInputId = nanoid();
  const formSubmitHandler = (name, number) => {
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        name,
        number,
        id: nanoid(),
      };
      setContacts((prevState) => [...prevState, contact]);
    }
  };
  const handleFilter = (event) => {
    setFilter(event.currentTarget.value);
  };
  const getFilterName = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const handleDelContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };
  return (
    <>
      <h1 className="title">Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <h2 className="title">Contacts</h2>
      <Filter
        htmlFor={filterInputId}
        onChange={handleFilter}
        value={filter}
        id={filterInputId}
      />
      <ContactsList
        contacts={getFilterName()}
        onDelContact={handleDelContact}
      />
    </>
  );
};
export default AddContacts;
