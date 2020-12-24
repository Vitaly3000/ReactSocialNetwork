const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
let store = {
  _state: {
    messagesPage: {
      dialogs: [
        { name: 'Vitaly', id: 1 },
        { name: 'Sasha', id: 2 },
        { name: 'Boris', id: 3 },
        { name: 'Victor', id: 4 },
      ],
      messages: [
        { message: 'hi', id: 1 },
        { message: 'hi, how are you?', id: 2 },
        { message: 'hi, how are you?', id: 3 },
        { message: " as you see,i'm fine", id: 4 },
        { message: "it's good!", id: 5 },
        { message: 'and you?', id: 6 },
        { message: 'i also feel good', id: 7 },
      ],
      newMessageText: '',
    },

    profilePage: {
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
    },
  },
  _callSubscriber() {
    console.log('state was changed');
  },
  dispatch(action) {
    switch (action.type) {
      case 'ADD-POST':
        {
          let newPost = {
            text: this._state.profilePage.newPostText,
            id: 1,
            likesCount: 11,
            img:
              'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
          };
          this._state.profilePage.posts.push(newPost);
          this._state.profilePage.newPostText = '';
          this._callSubscriber(this._state);
        }
        break;
      case 'UPDATE-NEW-POST-TEXT':
        {
          this._state.profilePage.newPostText = action.newText;
          this._callSubscriber(this._state);
        }
        break;
      case 'UPDATE-NEW-MESSAGE-TEXT':
        {
          this._state.messagesPage.newMessageText = action.newText;
          this._callSubscriber(this._state);
        }
        break;
      case 'SEND-MESSAGE':
        {
          let newMessage = {
            message: this._state.messagesPage.newMessageText,
            id: 1,
          };
          this._state.messagesPage.messages.push(newMessage);
          this._state.messagesPage.newMessageText = '';
          this._callSubscriber(this._state);
        }
        break;
    }
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
};
export const updateNewMessageTextActionCreater = (text) => {
  return { type: UPDATE_NEW_MESSAGE_TEXT, newText: text };
};
export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });
export const updateNewPostTextActionCreater = (text) => {
  return { type: UPDATE_NEW_POST_TEXT, newText: text };
};
export const addPostActionCreator = () => ({ type: ADD_POST });

export default store;
