import { useEffect, useState } from "react";

import API from "../api/axios";

import Sidebar from "../components/Sidebar";
import DashboardLayout from "../layouts/DashboardLayout";

function Tasks() {

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  useEffect(() => {

    fetchTasks();

  }, []);

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const res = await API.get(
        "/tasks",
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

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // CREATE TASK
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        title: "",
        description: "",
        status: "Pending",
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await API.delete(
        `/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  // UPDATE TASK STATUS
  const updateTaskStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <h1>My Tasks</h1>

        {/* TASK FORM */}

        <div className="form-design">
            <form
          onSubmit={handleSubmit}
          className="task-form"
        >

          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

          <button type="submit">
            Create Task
          </button>

        </form>
        </div>

        {/* TASK LIST */}

        <div className="task-grid">

          {tasks.map((task) => (

            <div
              className="task-card"
              key={task._id}
            >

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                Status:
                <strong>
                  {" "}
                  {task.status}
                </strong>
              </p>

              <div className="task-actions">

                <button
                  onClick={() =>
                    updateTaskStatus(
                      task._id,
                      task.status === "Pending"
                        ? "Completed"
                        : "Pending"
                    )
                  }
                >
                  Toggle Status
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Tasks;