import React from "react";
import my_name from "./my_info";
import { Link } from "react-router-dom";

function Header() {
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
