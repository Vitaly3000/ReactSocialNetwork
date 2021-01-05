import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  maxLengthCreator,
  required,
} from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
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
const maxlength = maxLengthCreator(50);
const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          placeholder="Введите текст"
          validate={[required, maxlength]}
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
