import React from 'react';
import { connect } from 'react-redux';
import { updateNewPostText, addPost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
  };
};

let MyPostsContainer = connect(mapStateToProps, { updateNewPostText, addPost })(
  MyPosts,
);
export default MyPostsContainer;
