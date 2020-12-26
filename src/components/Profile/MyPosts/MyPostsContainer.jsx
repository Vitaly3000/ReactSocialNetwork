import React from 'react';
import {
  updateNewPostTextActionCreater,
  addPostActionCreator,
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
  let state = props.store.getState();
  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  };
  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostTextActionCreater(text));
  };
  return (
    <MyPosts
      addPost={addPost}
      updateNewPostText={onPostChange}
      newPostText={state.profilePage.newPostText}
      posts={state.profilePage.posts}
    />
  );
};
export default MyPostsContainer;
