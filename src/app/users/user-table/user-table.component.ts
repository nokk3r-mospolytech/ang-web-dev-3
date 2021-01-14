import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Muser, MyWorkerType } from 'src/app/shared/models/muser.model';
import { MuserService } from 'src/app/shared/services/muser.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  users: Muser[] = [];
  id: number;
  myWorkerType = MyWorkerType;
  
  @Input() typeS = null;
  @Input() title = '';
  @Input() searchStroke = '';
  

  constructor(private muserSevice: MuserService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  sort = null;
  
  sortTable(sortType){
    if (sortType == 0 )
      if (this.sort != 0){
        console.log("ID в порядке возрастания");
        this.sort = 0;
        this.users.sort(function(a, b) { 
          return a.id - b.id;
        });
      }
      else {
        console.log("ID в порядке убывания");
        this.sort = 1;
        this.users.sort(function(a, b) { 
          return b.id - a.id;
        });
      }
    else 
      if (this.sort != 2){
        console.log("Возраст в порядке возрастания");
        this.sort = 2;
        this.users.sort(function(a, b) {          
          return Date.parse(a.birthday) - Date.parse(b.birthday);
        });
      }
      else {
        console.log("Возраст в порядке убывания");
        this.sort = 3;
        //console.log(this.users);
        this.users.sort(function(a, b) {
          return Date.parse(b.birthday) - Date.parse(a.birthday);
        });
      }
  }

  getByType(type: number) {
    // console.log(type);
    // console.log(this.users);
    return this.users.filter(users => users.type === type);
  }

  FindAge(birthday: string): any{
    let timeDiff = Math.abs(Date.now() - Date.parse(birthday));
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }
  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }


  async getData() {
    try {
      let users = this.muserSevice.getAll();
      this.users = isNullOrUndefined(await users) ? [] : await users; 
      //this.users = await users;
    } catch(err) {
      console.error(err);
    }
  }
  async onDelete(id: number) {
    try {
        await this.muserSevice.deleteOneById(id);
        this.getData();
      //await this.muserSevice.deleteOneById(this.id);
    } catch(err) {
      console.error(err);
    }
  }
}
