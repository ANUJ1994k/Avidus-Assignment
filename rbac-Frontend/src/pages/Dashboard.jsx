import { useEffect, useState } from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

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

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      // ADMIN

      if (user.role === "Admin") {

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
            (task) =>
              task.status === "Completed"
          ).length,

          pending: tasks.filter(
            (task) =>
              task.status === "Pending"
          ).length,
        });

      }

      // NORMAL USER

      else {

        const tasksRes = await API.get(
          "/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tasks = tasksRes.data.tasks;

        setStats({
          users: 0,

          tasks: tasks.length,

          completed: tasks.filter(
            (task) =>
              task.status === "Completed"
          ).length,

          pending: tasks.filter(
            (task) =>
              task.status === "Pending"
          ).length,
        });

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <DashboardLayout>

      <h1>
        Welcome, {user.name}
      </h1>

      <div className="stats-grid">

        {/* ADMIN ONLY */}

        {user.role === "Admin" && (

          <div className="stat-card">

            <h2>{stats.users}</h2>

            <p>Total Users</p>

          </div>

        )}

        {/* TOTAL TASKS */}

        <div className="stat-card">

          <h2>{stats.tasks}</h2>

          <p>Total Tasks</p>

        </div>

        {/* COMPLETED */}

        <div className="stat-card">

          <h2>{stats.completed}</h2>

          <p>Completed Tasks</p>

        </div>

        {/* PENDING */}

        <div className="stat-card">

          <h2>{stats.pending}</h2>

          <p>Pending Tasks</p>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Dashboard;