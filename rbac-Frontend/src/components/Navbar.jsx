import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { logout } = useAuth();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="navbar">

      <div>

        <h2>RBAC Dashboard</h2>

      </div>

      <div className="navbar-right">

        <p>
          Welcome,
          <strong> {user?.name}</strong>
        </p>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;