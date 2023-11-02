import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={styles.nav}>
      <NavLink
        className={styles.link}
        to="/"
        onClick={() => handleNavLinkClick("home")}
        style={activeLink === "home" ? { color: "white" } : null}
      >
        <span>
          <FontAwesomeIcon icon={faHouse} />
        </span>
        Home
      </NavLink>
      <NavLink
        className={styles.link}
        to="/search"
        onClick={() => handleNavLinkClick("search")}
        style={activeLink === "search" ? { color: "white" } : null}
      >
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        Search
      </NavLink>
    </div>
  );
};

export default Navbar;
