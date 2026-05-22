import { useEffect, useState } from "react";

import API from "../api/axios";

function ActivityLogs() {

  const [logs, setLogs] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchLogs();

  }, []);

  const fetchLogs = async () => {

    const res = await API.get(
      "/admin/logs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLogs(res.data.logs);

  };

  return (

    <div>

      <h1>Activity Logs</h1>

      {logs.map((log) => (

        <div key={log._id}>

          <h3>{log.action}</h3>

          <p>{log.details}</p>

        </div>

      ))}

    </div>

  );

}

export default ActivityLogs;