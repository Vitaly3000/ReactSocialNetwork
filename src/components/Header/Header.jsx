import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://www.google.com/logos/doodles/2020/halloween-2020-6753651837108597.4-s.png"
        alt="logo"
      />
      {props.isAuth ? (
        <>
          <span>id: {props.userId}</span>
          <span>email: {props.email}</span>
          <span>login: {props.login}</span>
        </>
      ) : (
        <NavLink to="/login">
          <span>Вы не вошли</span>
          <span>email: jyw18078@zwoho.com</span>
          <div>1q2w3e1a2s3d</div>
        </NavLink>
      )}
    </header>
  );
};
export default Header;
