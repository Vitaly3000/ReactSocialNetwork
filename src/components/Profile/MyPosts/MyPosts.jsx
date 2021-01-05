import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Post from './Post/Post';
const MyPosts = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post img={post.img} message={post.text} />
  ));
  let onAddPost = (value) => {
    props.addPost(value.newPostText);
  };

  return (
    <div>
      <div>
        <AddPostFormRedux onSubmit={onAddPost} />
      </div>
      {postsElements.reverse()}
    </div>
  );
};

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component="textarea"
          placeholder="Введите текст"
        />
      </div>
      <div>
        <button>Добавить пост</button>
      </div>
    </form>
  );
};
const AddPostFormRedux = reduxForm({ form: 'addPostForm' })(AddPostForm);
export default MyPosts;
