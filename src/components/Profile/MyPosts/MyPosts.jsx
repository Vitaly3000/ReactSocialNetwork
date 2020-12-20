import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post img={post.img} message={post.text} />
  ));
  return (
    <div>
      <div>
        <textarea placeholder="мой пост"></textarea>
      </div>
      <div>
        <button>Добавить пост</button>
      </div>
      {postsElements}
    </div>
  );
};
export default MyPosts;
