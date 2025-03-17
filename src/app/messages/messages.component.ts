import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Message } from './models/message.model';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import * as MessagesActions from './store/messages.actions';
import * as MessagesSelectors from './store/messages.selectors';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  messages$: Observable<Message[]> = this.store.select(
    MessagesSelectors.selectAllMessages
  );
  loading$: Observable<boolean> = this.store.select(
    MessagesSelectors.selectMessagesLoading
  );
  submitting$: Observable<boolean> = this.store.select(
    MessagesSelectors.selectMessagesSubmitting
  );

  displayedColumns: string[] = ['id', 'email', 'message', 'createdAt'];

  ngOnInit(): void {
    this.store.dispatch(MessagesActions.loadMessages());
  }

  openMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          MessagesActions.addMessage({
            email: result.email,
            message: result.message,
          })
        );
      }
    });
  }

  formatMessage(message: string): string {
    return message.length > 100 ? message.substring(0, 100) + '...' : message;
  }
}
