import React, { useEffect, useState } from "react";
import my_name from "./my_info";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesAlt } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const check_for_token = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/register");
      return;
    }

    try {
      const res = await fetch("http://localhost:4500/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUser(data.user); // ✅ store user
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      check_for_token();
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 🔴 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header id="header">
      {/* ✅ Profile Section */}
      <div>
        {user ? (
          <>
            <span>{user.user_name?.[0]}</span>
            <span>{user.user_name}</span>
          </>
        ) : (
          <>
            <span>{my_name[0]}</span>
            <span>{my_name}</span>
          </>
        )}
      </div>

      {/* ✅ Navigation */}
      <nav>
        <ul>
          <li>
            <Link to="/chat_with_bayne">
              <FontAwesomeIcon icon={faHeadphonesAlt} />
            </Link>
          </li>
        </ul>
      </nav>

      {/* ✅ Logout */}
      <button onClick={handleLogout}>Sign Out</button>
    </header>
  );
}

export default Header;
