import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent {
  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessageDialogComponent>
  ) {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.dialogRef.close(this.messageForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
