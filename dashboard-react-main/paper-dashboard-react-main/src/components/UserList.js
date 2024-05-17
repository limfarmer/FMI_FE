import React, { useEffect, useState } from "react";
import { fetchUsers } from "./api";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Fetching users failed:", error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
