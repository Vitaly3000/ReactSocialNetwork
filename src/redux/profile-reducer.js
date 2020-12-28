const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
  posts: [
    {
      text: "Hi,it's my first post",
      id: 1,
      likesCount: 11,
      img:
        'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
    },
    {
      text: "It's cool",
      id: 2,
      likesCount: 12,
      img:
        'https://i.pinimg.com/originals/53/f9/8a/53f98a6b76f60356b2b4c261963377e6.jpg',
    },
  ],
  newPostText: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD-POST': {
      let newPost = {
        text: state.newPostText,
        id: 1,
        likesCount: 11,
        img:
          'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
      };
      let stateCopy = { ...state };
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(newPost);
      stateCopy.newPostText = '';
      return stateCopy;
    }
    case 'UPDATE-NEW-POST-TEXT': {
      let stateCopy = { ...state };
      stateCopy.newPostText = action.newText;
      return stateCopy;
    }
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
