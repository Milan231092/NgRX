import { createReducer, on } from '@ngrx/store';
import { Message } from '../models/message.model';
import * as MessagesActions from './messages.actions';

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  submitting: boolean;
  error: any;
}

export const initialState: MessagesState = {
  messages: [],
  loading: false,
  submitting: false,
  error: null,
};

export const messagesReducer = createReducer(
  initialState,
  // Load Messages
  on(MessagesActions.loadMessages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MessagesActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false,
  })),
  on(MessagesActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Add Message
  on(MessagesActions.addMessage, (state) => ({
    ...state,
    submitting: true,
    error: null,
  })),
  on(MessagesActions.addMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [message, ...state.messages],
    submitting: false,
  })),
  on(MessagesActions.addMessageFailure, (state, { error }) => ({
    ...state,
    error,
    submitting: false,
  }))
);
