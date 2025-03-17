import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { of, from } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as MessagesActions from './messages.actions';
import { serverTimestamp } from '@angular/fire/firestore';

@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions);
  private firestore = inject(Firestore);
  private snackBar = inject(MatSnackBar);

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.loadMessages),
      switchMap(() => {
        const messagesRef = collection(this.firestore, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        return from(getDocs(q)).pipe(
          map((snapshot) => {
            const messages = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                email: data['email'],
                message: data['message'],
                createdAt: data['createdAt']?.toDate() || new Date(),
              };
            });
            return MessagesActions.loadMessagesSuccess({ messages });
          }),
          catchError((error) =>
            of(MessagesActions.loadMessagesFailure({ error }))
          )
        );
      })
    )
  );

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessage),
      mergeMap((action) => {
        const messagesRef = collection(this.firestore, 'messages');
        const newMessage = {
          email: action.email,
          message: action.message,
          createdAt: serverTimestamp(),
        };

        return from(addDoc(messagesRef, newMessage)).pipe(
          map((docRef) => {
            this.snackBar.open('Message sent successfully!', 'Close', {
              duration: 3000,
              panelClass: 'success-snackbar',
            });

            return MessagesActions.addMessageSuccess({
              message: {
                id: docRef.id,
                email: action.email,
                message: action.message,
                createdAt: new Date(),
              },
            });
          }),
          catchError((error) => {
            this.snackBar.open(
              'Failed to send message. Please try again.',
              'Close',
              {
                duration: 3000,
                panelClass: 'error-snackbar',
              }
            );
            return of(MessagesActions.addMessageFailure({ error }));
          })
        );
      })
    )
  );
}
