const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE-NEW-MESSAGE-TEXT': {
      state.newMessageText = action.newText;

      return state;
    }

    case 'SEND-MESSAGE': {
      let newMessage = {
        message: state.newMessageText,
        id: 1,
      };
      state.messages.push(newMessage);
      state.newMessageText = '';

      return state;
    }
    default:
      return state;
  }
};
export const updateNewMessageTextActionCreater = (text) => {
  return { type: UPDATE_NEW_MESSAGE_TEXT, newText: text };
};
export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export default dialogsReducer;
