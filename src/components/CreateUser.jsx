import React, {  useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { setUser } from "../utils/userService";
import Joi, { schema } from "joi-browser";
import ViewUser from "./ViewUser";
const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone : Joi.number().required()
  };

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(userData, schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const doSubmit = async () => {
    await setUser(userData);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors({ errors: errors || {} })
    if (errors) return;
    doSubmit();
    setIsOpen(false);
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name] : value };
    const schemas = { [name] : schema[name]};
    const { error } = Joi.validate(obj, schemas);
    return error ? error.details[0].message : null;
    
   };

  const handleChange = ({ currentTarget: input }) => {

    const errorMsg = { ...errors };
     const errorMessage = validateProperty(input);
     if (errorMessage) errorMsg[input.name] = errorMessage;
     else delete errorMsg[input.name];

    const data = { ...userData };
    data[input.name] = input.value;
    setUserData(data);
  };


  return (
    <>
      <div className="container">
        <button className="btn btn-primary" onClick={openModal}>
          Add User
        </button>
        <Modal show={isOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="enter name"
                />
                <span style={{color : "red"}}>{errors.errors && errors.errors.name}</span>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address...."
                />
                <span style={{color : "red"}}>{errors.errors && errors.errors.email}</span>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Email address
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number...."
                />
                <span style={{color : "red"}}>{errors.errors && errors.errors.phone}</span>
              </div>
              <Button type="submit" variant="secondary">
                Save
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <ViewUser />
      </div>
    </>
  );
};

export default CreateUser;
