import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements AfterViewInit {

  title!: string;
  message!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogConfirmComponent>) {
  }

  ngAfterViewInit(): void {
    this.title = this.data['title'] ? this.data['title'] : 'warning';
    this.message = this.data['message'];
  }

  accept() {
    this.dialogRef.close({accepted: true});
  }

  refuse() {
    this.dialogRef.close({accepted: false});
  }

}
