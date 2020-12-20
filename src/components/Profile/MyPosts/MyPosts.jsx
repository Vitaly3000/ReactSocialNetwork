import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post img={post.img} message={post.text} />
  ));
  let newPostElement = React.createRef();
  let addPost = () => {
    
    let text = newPostElement.current.value;
    props.addPost(text);
    newPostElement.current.value='';
    
  }
  return (
    <div>
      <div>
        <textarea ref={newPostElement}placeholder="мой пост"></textarea>
      </div>
      <div>
        <button onClick={addPost}>Добавить пост</button>
      </div>
      {postsElements}
    </div>
  );
};
export default MyPosts;
