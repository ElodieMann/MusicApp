import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const tabActive = (e) => {
    if (!isActive) {
      setIsActive(true);
      e.target.value.style = "white";
    } else {
      setIsActive(false);
      e.target.value.style = "rgba(255, 255, 255, 0.278)";
    }
  };
  return (
    <div className={styles.nav}>
      <NavLink className={styles.link} to="/" onClick={tabActive} activeStyle>
        <span>
          <FontAwesomeIcon icon={faHouse} />
        </span>
        Home
      </NavLink>
      <NavLink className={styles.link} to="/search" activeStyle>
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        Search
      </NavLink>
    </div>
  );
};

export default Navbar;
