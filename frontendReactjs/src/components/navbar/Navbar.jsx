import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
const navigate = useNavigate()
  const onClickLogin = ()=>{
    navigate("/login")
  }
  const onClickLogout = ()=>{
    navigate("/")
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">SuperBooking.com</span>
        </Link>
        
        {user ? (
          <div className="navItems">
            <button className="navButton">{user.username} </button>
            {/* <button className="navButton">Logout</button> */}
          </div>
        ) : (
          <div className="navItems">
            <button onClick={onClickLogin} className="navButton">Register</button>
            <button onClick={onClickLogin} className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
