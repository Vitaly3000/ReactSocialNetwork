import { Dispatch } from 'redux';
import { chatAPI, ChatMessageType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED': {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    }
    default: {
      return state;
    }
  }
};
export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'chat/MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
};
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.startChannel();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.closeChannel();
};
export const sendChatMessage = (message: string): ThunkType => async (
  dispatch,
) => {
  chatAPI.sendMessage(message);
};
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
type InitialStateType = typeof initialState;
export default chatReducer;
