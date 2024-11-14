import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-generic',
  templateUrl: './dialog-generic.component.html',
  styleUrls: ['./dialog-generic.component.css']
})
export class DialogGenericComponent implements AfterViewInit {

  title!: string;
  message!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogGenericComponent>) {
  }

  ngAfterViewInit(): void {
    this.title = this.data['title'] ? this.data['title'] : 'warning';
    this.message = this.data['message'];
  }

  confirm() {
    this.dialogRef.close();
  }

}
