import React, { useState } from 'react';
import style from './Paginator.module.css';
import classnames from 'classnames';
const Paginator = ({ portionSize = 10, ...props }) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <button
          className={style.btn_prev}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber,
        )
        .map((p) => {
          return (
            <button
              className={classnames({
                [style.currentPage]: props.currentPage === p,
              })}
              key={p}
              onClick={() => props.onPageChanged(p)}>
              {p}
            </button>
          );
        })}
      {pagesCount > portionNumber && (
        <button
          className={style.btn_next}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          NEXT
        </button>
      )}
    </div>
  );
};
export default Paginator;
