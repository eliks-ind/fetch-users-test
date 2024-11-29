import React, { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        const fetchedUsers = data.data;
        setUsers(fetchedUsers.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const addUser = () => {
    if (name && surname) {
      const newUser = { name, surname };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setName("");
      setSurname("");
    } else {
      alert("Please fill both fields.");
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} {user.surname}
          </li>
        ))}
      </ul>

      <h2>Add a User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default App;
