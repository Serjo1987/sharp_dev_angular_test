import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-list-of-logged-user-transactions',
  templateUrl: './list-of-logged-user-transactions.component.html',
  styleUrls: ['./list-of-logged-user-transactions.component.scss']
})
export class ListOfLoggedUserTransactionsComponent implements OnInit {
  constructor(private api: ApiService, private matSnackBar: MatSnackBar) { }

  public list: any;

  private openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.api.listOfTransactions().subscribe(
      (data: any) => {
        this.list = data.trans_token;
      },
      (error: any) => {
        this.openSnackBar(error.error, 'close');
      }
    );
  }
}
