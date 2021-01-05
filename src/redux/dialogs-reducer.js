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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND-MESSAGE': {
      let text = action.newMessageText;
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            message: text,
            id: 1,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export const sendMessage = (newMessageText) => ({
  type: SEND_MESSAGE,
  newMessageText,
});

export default dialogsReducer;
