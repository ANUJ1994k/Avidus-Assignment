import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaTasks,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

function Sidebar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const location = useLocation();

  return (

    <div className="sidebar">

      <h2 className="logo">
        Admin Panel
      </h2>

      {/* HOME */}

      <Link
        to="/dashboard"
        className={
          location.pathname === "/dashboard"
            ? "active-link"
            : ""
        }
      >
        <FaHome />
        <span>Dashboard</span>
      </Link>

      {/* TASKS */}

      <Link
        to="/tasks"
        className={
          location.pathname === "/tasks"
            ? "active-link"
            : ""
        }
      >
        <FaTasks />
        <span>My Tasks</span>
      </Link>

      {/* ADMIN ROUTES */}

      {user?.role === "Admin" && (

        <>

          <Link
            to="/admin/users"
            className={
              location.pathname === "/admin/users"
                ? "active-link"
                : ""
            }
          >
            <FaUsers />
            <span>Users</span>
          </Link>

          <Link
            to="/admin/tasks"
            className={
              location.pathname === "/admin/tasks"
                ? "active-link"
                : ""
            }
          >
            <FaClipboardList />
            <span>Task Monitoring</span>
          </Link>

          <Link
            to="/admin/logs"
            className={
              location.pathname === "/admin/logs"
                ? "active-link"
                : ""
            }
          >
            <FaClipboardList />
            <span>Activity Logs</span>
          </Link>

        </>

      )}

    </div>

  );

}

export default Sidebar;