import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  constructor(private api: ApiService, private matSnackBar: MatSnackBar) { }

  private user: any;

  private openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.api.userInfo().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        this.openSnackBar(error.error, 'close');
      }
    );
  }
}
