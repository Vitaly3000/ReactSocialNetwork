import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
  };
};

let MyPostsContainer = connect(mapStateToProps, {
  addPost: actions.addPost,
  deletePost: actions.deletePost,
})(MyPosts);
export default MyPostsContainer;
