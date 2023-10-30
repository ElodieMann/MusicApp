import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
             <NavLink to="/" activeStyle>
                        Home
            </NavLink>
             <NavLink to="/search" activeStyle>
                        Search
            </NavLink>
        </div>
    );
};

export default Navbar;