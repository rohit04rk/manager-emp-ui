import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,) { }

  ngOnInit() {
  }

  yes() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close(false)
  }

}
