import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTableComponent } from './user-table/user-table.component';
import { FindUsersPipe } from '../shared/pipes/find-users.pipe';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [UsersComponent, UserListComponent, UserEditComponent, UserTableComponent, FindUsersPipe],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    
  ]
})
export class UsersModule { }
