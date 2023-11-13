import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };
  // tous les strings dans un ficher keys
  // les colors en hexadecimal
  return (
    <div className={styles.nav}>
      <NavLink
        className={styles.link}
        // au lieu du style cree 2 classe et met les en conditions
        // `{${styles.link} ${ activeLink === "home" ? styles.white : ""}}`
        // activeLink === "home" ? styles.white : ""
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
        // au lieu du style cree 2 classe et met les en conditions
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
