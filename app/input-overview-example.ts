import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
}

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'input-overview-example',
  styleUrls: ['input-overview-example.css'],
  templateUrl: 'input-overview-example.html',
})
export class InputOverviewExample {
  constructor(public dialog: MatDialog) {}

  public messageBoard = {
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
  };
  messageBoardText = this.messageBoard.message;
  showMoreToggle: boolean = false;
  textLength: number;

  ngOnInit() {
    this.textLength = this.textLength || 20;
    if(this.messageBoardText.length > this.textLength) {
      this.showMoreToggle = true;
    }
    else if(this.messageBoardText === '') {
      this.showMoreToggle = false;
    }
    else {
      this.showMoreToggle = false;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReadMoreContentDialog, {
      width: '250px',
      data: {message: this.messageBoardText}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        this.messageBoardText = result;
        this.messageBoardText.length > this.textLength ? this.showMoreToggle = true: this.showMoreToggle = false;
      }
      else {
        this.messageBoardText = '';
        this.showMoreToggle = false;
      }
    });
  }
}


@Component({
  selector: 'read-more-content-dialog',
  templateUrl: 'read-more-content-dialog.html',
})
export class ReadMoreContentDialog {

  constructor(
    public dialogRef: MatDialogRef<ReadMoreContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */