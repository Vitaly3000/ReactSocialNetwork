import React from 'react';
import {
  updateNewPostTextActionCreater,
  addPostActionCreator,
} from '../../../redux/profile-reducer';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let postsElements = props.profilePage.posts.map((post) => (
    <Post img={post.img} message={post.text} />
  ));
  let newPostElement = React.createRef();
  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };
  let onChangePost = () => {
    
    let text = newPostElement.current.value;

    props.dispatch(updateNewPostTextActionCreater(text));
    
  };
  return (
    <div>
      <div>
        <textarea
          ref={newPostElement}
          placeholder="Введите текст"
          onChange={onChangePost}
          value={props.profilePage.newPostText}></textarea>
      </div>
      <div>
        <button onClick={addPost}>Добавить пост</button>
      </div>
      {postsElements.reverse()}
    </div>
  );
};
export default MyPosts;
