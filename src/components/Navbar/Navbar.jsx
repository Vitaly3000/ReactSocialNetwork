import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="/Profile">
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="/Dialogs">
          Message
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="/Users">
          Users
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="/Settings">
          Settings
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
