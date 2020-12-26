import React from 'react';
import Post from './Post/Post';
const MyPosts = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post img={post.img} message={post.text} />
  ));
  let onAddPost = () => {
    props.addPost();
  };
  let onChangePost = (e) => {
    let text = e.target.value;
    props.updateNewPostText(text);
  };
  return (
    <div>
      <div>
        <textarea
          placeholder="Введите текст"
          onChange={onChangePost}
          value={props.newPostText}></textarea>
      </div>
      <div>
        <button onClick={onAddPost}>Добавить пост</button>
      </div>
      {postsElements.reverse()}
    </div>
  );
};
export default MyPosts;
