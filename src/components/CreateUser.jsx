import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser, getUser, setUser } from "../utils/userService";
import ViewUser from "./ViewUser";
const CreateUser = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const doSubmit = async () => {
    await setUser(userData);
  };

  const getUserData = async () => {
    await getUser().then((response) => {
      const fetchedResult = [];
      for (let key in response.data) {
        fetchedResult.unshift({
          ...response.data[key],
          id: key,
        });
      }
      setUsers(fetchedResult);
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
    setIsOpen(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    const data = { ...userData };
    data[input.name] = input.value;
    setUserData(data);
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    let newUser = users.filter((item) => {
      return item.id !== userId;
    });
    setUsers(newUser);
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
        <ViewUser users={users} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default CreateUser;
