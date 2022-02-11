import "./App.css";
import Form from "./components/Form";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";
function App() {
  return (
    <div className="App">
      <AddContacts />
    </div>
  );
}
export default App;
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

  // const handleInputChange = (event) => {
  //   setName(event.currentTarget.value);
  // };

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

// import "./App.css";
// import Form from "./components/Form";
// import React, { Component } from "react";
// import { nanoid } from "nanoid";
// import ContactsList from "./components/ContactsList";
// import Filter from "./components/Filter";
// function App() {
//   return (
//     <div className="App">
//       <AddContacts />
//     </div>
//   );
// }
// export default App;
// class AddContacts extends Component {
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem("contacts");
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     }
//   }
//   filterInputId = nanoid();
//   handleInputChange = (event) => {
//     this.setState({
//       [event.currentTarget.name]: event.currentTarget.value,
//     });
//   };
//   formSubmitHandler = ({ name, number }) => {
//     const { contacts } = this.state;
//     const contact = {
//       name,
//       number,
//       id: nanoid(),
//     };
//     if (
//       contacts.find(
//         (contact) => contact.name.toLowerCase() === name.toLowerCase()
//       )
//     ) {
//       alert(`${name} is already in contacts.`);
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [...contacts, contact],
//       }));
//     }
//   };
//   handleFilter = (event) => {
//     this.setState({ filter: event.currentTarget.value });
//   };
//   getFilterName = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter((contacts) =>
//       contacts.name.toLowerCase().includes(normalizedFilter)
//     );
//   };
//   handleDelContact = (contactId) => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter((contact) => contact.id !== contactId),
//     }));
//   };
//   render() {
//     const filterContact = this.getFilterName();
//     const { filter } = this.state;
//     return (
//       <>
//         <h1 className="title">Phonebook</h1>
//         <Form onSubmit={this.formSubmitHandler} />
//         <h2 className="title">Contacts</h2>
//         <Filter
//           htmlFor={this.filterInputId}
//           onChange={this.handleFilter}
//           value={filter}
//           id={this.filterInputId}
//         />
//         <ContactsList
//           contacts={filterContact}
//           onDelContact={this.handleDelContact}
//         />
//       </>
//     );
//   }
// }
