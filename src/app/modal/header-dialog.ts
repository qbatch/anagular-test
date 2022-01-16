import {Component, Inject, Input, Optional} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    message: string;
  }

@Component({
  selector: 'header-dialog',
  templateUrl: 'header-dialog.html'
})
export class HeaderDialog {
  title: string = '';
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<HeaderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
      this.title = data.title;
      this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close('Ok');
  }

}

