import React, { useEffect } from "react";
import my_name from "./my_info";
import { Link } from "react-router-dom";

function Header() {

  // const []

  const check_for_token = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      location.assign("/register");
      return;
    }

    try {
      const res = await fetch("http://localhost:4500/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!res.ok) {
        // localStorage.removeItem("token");
        // location.assign("/register");
        return;
      }

      const data = await res.json();
      console.log(data);
      // set_user_data(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    check_for_token();
  },[])

  return (
    <header id="header">
      {/* Create a Profile */}
      <div>
        <span>{my_name[0]}</span>
        <span>{my_name}</span>
      </div>

          <nav>
              <ul>
                  <li><Link>Home</Link></li>
                  <li><Link>About Us</Link></li>
                  <li><Link>Contact Info</Link></li>
              </ul>
      </nav>

      {/* Create a Profile */}
    
        <button>Sign Out</button>
      {/* </> */}
    </header>
  );
}

export default Header;
