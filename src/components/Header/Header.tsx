import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
type PropsType = MapPropsType & DispatchPropsType;
export type MapPropsType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
export type DispatchPropsType = {
  logout: () => void;
};
const Header: React.FC<PropsType> = ({
  userId,
  email,
  login,
  logout,
  isAuth,
}) => {
  return (
    <header className={s.header}>
      <img
        src="https://www.google.com/logos/doodles/2020/halloween-2020-6753651837108597.4-s.png"
        alt="logo"
      />
      {isAuth ? (
        <>
          <span>id: {userId}</span>
          <span>email: {email}</span>
          <span>login: {login}</span>
          <button onClick={logout}>Выйти</button>
        </>
      ) : (
        <NavLink to="/login">
          <span>Вы не вошли</span>
          <div>email: eiz57720@cuoly.com</div>
        </NavLink>
      )}
    </header>
  );
};
export default Header;
