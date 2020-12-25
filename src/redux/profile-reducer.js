const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


const profileReducer = (state, action) => {
  switch (action.type) {
    case 'ADD-POST':
      let newPost = {
        text: state.newPostText,
        id: 1,
        likesCount: 11,
        img:
          'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
      };
      state.posts.push(newPost);
      state.newPostText = '';

      return state;

    case 'UPDATE-NEW-POST-TEXT':
      state.newPostText = action.newText;

      return state;

    default: {
      return state;
    }
  }
};
export const updateNewPostTextActionCreater = (text) => {
 return { type: UPDATE_NEW_POST_TEXT, newText: text };
};
export const addPostActionCreator = () => ({ type: ADD_POST });
export default profileReducer;
