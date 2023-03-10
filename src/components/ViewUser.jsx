import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser, getUser, updateUserData } from "../utils/userService";
const ViewUser = () => {
  const [editUserData, setEditUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserData();
  }, [users]);

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
  const openModal = (currentUser) => {
    setIsOpen(true);
    setEditUserData(currentUser);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = async () => {
   await updateUserData(editUserData.id, editUserData).then((response) => {
        setUsers(response.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
    setIsOpen(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    const data = { ...editUserData };
    data[input.name] = input.value;
    setEditUserData(data);
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 && users.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        openModal(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
                  value={editUserData?.name}
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
                  value={editUserData?.email}
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
                  value={editUserData?.phone}
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
      </div>
    </>
  );
};

export default ViewUser;
