import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Muser, MyWorkerType } from 'src/app/shared/models/muser.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Muser[];
  myWorkerType = MyWorkerType;
  searchStr = '';

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

}
