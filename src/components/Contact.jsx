import React from "react";
import "./Contact.css";

// const Contact = ({ name, number }) => {
//   return (
//     <div className="contact-item">
//       <p>{name}</p>
//       <p>{number}</p>
//     </div>
//   );
// };

const Contact = ({ name, number }) => {
  return (
    <div className="contact-item">
      <p className="contact-name">{name}</p>
      <p className="contact-number">{number}</p>
    </div>
  );
};

export default Contact;
