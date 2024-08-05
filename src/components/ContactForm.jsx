import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import "./ContactForm.css";

// const ContactForm = ({ onAddContact }) => {
//   const initialValues = {
//     name: "",
//     number: "",
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(3, "Name must be at least 3 characters long")
//       .max(50, "Name must be at most 50 characters long")
//       .required("Name is required"),
//     number: Yup.string()
//       .matches(/^\d+$/, "Number must contain only digits")
//       .min(7, "Number must be at least 7 digits long")
//       .max(15, "Number must be at most 15 digits long")
//       .required("Number is required"),
//   });

//   const handleSubmit = (values, { resetForm }) => {
//     const newContact = {
//       id: nanoid(),
//       name: values.name,
//       number: values.number,
//     };

//     onAddContact(newContact);

//     resetForm();
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form>
//         <div className="form-name">
//           <label htmlFor="name">Name</label>
//           <Field type="text" id="name" name="name" />
//           <ErrorMessage name="name" component="div" />
//         </div>
//         <div className="form-number">
//           <label htmlFor="number">Number</label>
//           <Field type="text" id="number" name="number" />
//           <ErrorMessage name="number" component="div" />
//         </div>
//         <button className="form-btn" type="submit">
//           Add Contact
//         </button>
//       </Form>
//     </Formik>
//   );
// };

// export default ContactForm;

// const formatPhoneNumber = (number) => {
//   const cleaned = number.replace(/\D/g, "");

//   const match = cleaned.match(/^(\d{3})(\d{2})(\d{2})$/);

//   if (match) {
//     return `${match[1]}-${match[2]}-${match[3]}`;
//   }

//   return cleaned;
// };

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(3, "Name must be at least 3 characters long")
//     .max(50, "Name must be at most 50 characters long")
//     .required("Name is required"),
//   number: Yup.string()
//     .min(7, "Number must be at least 7 characters long")
//     .max(11, "Number must be at most 11 characters long")
//     .matches(/^\d+$/, "Number must contain only digits")
//     .required("Number is required"),
// });

// const ContactForm = ({ onAddContact }) => {
//   const handleSubmit = (values, { resetForm }) => {
//     const formattedNumber = formatPhoneNumber(values.number);

//     const newContact = {
//       id: nanoid(),
//       name: values.name,
//       number: formattedNumber,
//     };

//     onAddContact(newContact);
//     resetForm();
//   };

//   return (
//     <Formik
//       initialValues={{ name: "", number: "" }}
//       validationSchema={validationSchema}
//       onSubmit={(values, { resetForm, setSubmitting }) => {
//         handleSubmit(values, { resetForm });
//         setSubmitting(false);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className="contact-form">
//           <label htmlFor="name">Name</label>
//           <Field type="text" id="name" name="name" />
//           <ErrorMessage name="name" component="div" className="error" />

//           <label htmlFor="number">Number</label>
//           <Field type="text" id="number" name="number" maxLength="11" />
//           <ErrorMessage name="number" component="div" className="error" />

//           <button type="submit" disabled={isSubmitting}>
//             Add Contact
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ContactForm;

const formatPhoneNumber = (number) => {
  const cleaned = number.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return cleaned;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long")
    .required("Name is required"),
  number: Yup.string()
    .max(7, "Number must be at most 7 digits long")
    .matches(/^\d*$/, "Number must contain only digits")
    .required("Number is required"),
});

const ContactForm = ({ onAddContact }) => {
  const handleSubmit = (values, { resetForm }) => {
    const formattedNumber = formatPhoneNumber(values.number);

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: formattedNumber,
    };

    onAddContact(newContact);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        handleSubmit(values, { resetForm });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="contact-form">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-field">
            <label htmlFor="number">Number</label>
            <Field
              type="text"
              id="number"
              name="number"
              value={values.number}
              onChange={(event) => {
                const { value } = event.target;

                if (value.length <= 7 && /^\d*$/.test(value)) {
                  setFieldValue("number", value);
                }
              }}
            />
            <ErrorMessage name="number" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
