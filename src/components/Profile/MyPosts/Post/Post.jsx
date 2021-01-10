import React from 'react';
import style from './Post.module.css';
const Post = (props) => {
  return (
    <div className={style.item}>
      <div className={style.item_content}>
        {props.img ? <img src={props.img} alt="" /> : ''}
        {props.message}
      </div>

      <div className={style.btn_delete}>
        <span>{props.idPost}</span>
        <button
          onClick={() => {
            props.onDeletePost(props.idPost);
          }}>
          X
        </button>
      </div>
    </div>
  );
};
export default Post;
