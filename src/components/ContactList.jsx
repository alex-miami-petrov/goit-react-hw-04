import React from "react";
import Contact from "./Contact";
import "./ContactList.css";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className="contact-list">
    {contacts.map((contact) => (
      <li key={contact.id} className="contact-list-item">
        <Contact name={contact.name} number={contact.number} />
        <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default ContactList;
