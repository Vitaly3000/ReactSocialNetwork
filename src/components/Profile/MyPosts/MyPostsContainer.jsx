import React from 'react';
import { connect } from 'react-redux';
import {
  updateNewPostTextActionCreater,
  addPostActionCreator,
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextActionCreater(text));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  };
};
let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;
