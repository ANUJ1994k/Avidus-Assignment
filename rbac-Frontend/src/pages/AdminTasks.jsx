import { useEffect, useState } from "react";

import API from "../api/axios";

import Sidebar from "../components/Sidebar";

function AdminTasks() {

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get(
        "/admin/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data.tasks);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <h1>Task Monitoring</h1>

        <div className="task-grid">

          {tasks.map((task) => (

            <div
              className="task-card"
              key={task._id}
            >

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>Status: {task.status}</p>

              <p>
                User:
                {" "}
                {task.createdBy?.name}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default AdminTasks;