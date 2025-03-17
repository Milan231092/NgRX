import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesState } from './messages.reducer';

export const selectMessagesState =
  createFeatureSelector<MessagesState>('messages');

export const selectAllMessages = createSelector(
  selectMessagesState,
  (state) => state.messages
);

export const selectMessagesLoading = createSelector(
  selectMessagesState,
  (state) => state.loading
);

export const selectMessagesSubmitting = createSelector(
  selectMessagesState,
  (state) => state.submitting
);

export const selectMessagesError = createSelector(
  selectMessagesState,
  (state) => state.error
);
