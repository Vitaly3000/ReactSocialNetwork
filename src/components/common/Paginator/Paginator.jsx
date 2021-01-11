import React from 'react';
import style from './Paginator.module.css';

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div className={style.paginator}>
      {pages.map((p) => {
        return (
          <button
            onClick={() => props.onPageChanged(p)}
            className={props.currentPage === p && style.currentPage}>
            {p}
          </button>
        );
      })}
    </div>
  );
};
export default Paginator;
