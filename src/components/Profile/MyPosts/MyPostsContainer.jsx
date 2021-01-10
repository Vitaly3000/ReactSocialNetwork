import { connect } from 'react-redux';
import { addPost, deletePost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
  };
};

let MyPostsContainer = connect(mapStateToProps, { addPost,deletePost })(MyPosts);
export default MyPostsContainer;
