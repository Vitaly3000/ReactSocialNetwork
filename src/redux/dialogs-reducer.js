const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const dialogsReducer = (state, action) => {
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
