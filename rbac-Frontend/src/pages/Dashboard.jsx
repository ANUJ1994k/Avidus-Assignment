import { useEffect, useState } from "react";

import API from "../api/axios";

import Sidebar from "../components/Sidebar";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    users: 0,
    tasks: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {

    if (user.role === "Admin") {

      fetchAdminStats();

    }

  }, []);

  const fetchAdminStats = async () => {

    try {

      const usersRes = await API.get(
        "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tasksRes = await API.get(
        "/admin/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tasks = tasksRes.data.tasks;

      setStats({
        users: usersRes.data.users.length,
        tasks: tasks.length,
        completed: tasks.filter(
          (task) => task.status === "Completed"
        ).length,
        pending: tasks.filter(
          (task) => task.status === "Pending"
        ).length,
      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ padding: "20px" }}>

        <h1>Welcome {user.name}</h1>

        {user.role === "Admin" && (

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 200px)",
              gap: "20px",
            }}
          >

            <div>
              <h3>Total Users</h3>
              <h1>{stats.users}</h1>
            </div>

            <div>
              <h3>Total Tasks</h3>
              <h1>{stats.tasks}</h1>
            </div>

            <div>
              <h3>Completed Tasks</h3>
              <h1>{stats.completed}</h1>
            </div>

            <div>
              <h3>Pending Tasks</h3>
              <h1>{stats.pending}</h1>
            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Dashboard;