import React from 'react';
import s from './Header.module.css'
const Header = () => {
  return (
    <header className={s.header}>
      <img
        src="https://www.google.com/logos/doodles/2020/halloween-2020-6753651837108597.4-s.png"
        alt="logo"
      />
    </header>
  );
};
export default Header;
