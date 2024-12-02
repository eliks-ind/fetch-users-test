import React, { useState, useEffect } from "react";
import "./App.css";

interface User {
  name: string;
  surname: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network error");
        }

        interface ApiUser {
          name: string;
        }

        const data: ApiUser[] = await response.json();

        const firstThreeUsers = data.slice(0, 3).map((user) => {
          const partsOfName = user.name.split(" ");
          return {
            name: partsOfName[0],
            surname: partsOfName[1],
          };
        });
        setUsers(firstThreeUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
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

  const deleteUser = (index: number) => {
    setUsers((prevUsers) => prevUsers.filter((User, i) => i !== index));
  };

  return (
    <div>
      <h1>Ultimate Users List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} {user.surname}
            <button
              onClick={() => deleteUser(index)}
              style={{ marginLeft: "10px", padding: "5px 25px", margin: "3px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="inputForms">
        <h2>Add a User</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <br></br>
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default App;
