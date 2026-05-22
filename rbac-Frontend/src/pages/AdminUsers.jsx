import { useEffect, useState } from "react";

import API from "../api/axios";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    const res = await API.get(
      "/admin/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUsers(res.data.users);

  };

  return (

    <div>

      <h1>User Management</h1>

      {users.map((user) => (

        <div key={user._id}>

          <h3>{user.name}</h3>

          <p>{user.email}</p>

          <p>{user.role}</p>

        </div>

      ))}

    </div>

  );

}

export default AdminUsers;