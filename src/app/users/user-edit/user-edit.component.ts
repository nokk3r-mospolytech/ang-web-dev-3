import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Muser, MyWorkerType } from 'src/app/shared/models/muser.model';
import { MuserService } from 'src/app/shared/services/muser.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number;
  user: Muser;
  userForm: FormGroup;
  myWorkerType = MyWorkerType;

  
  public numberMask = ['+', /[7]/, '(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private activatedRoute: ActivatedRoute, 
    private muserService: MuserService,
    private router: Router) {
    this.activatedRoute.params.subscribe(params =>{
      if(!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }
    })
   }

  ngOnInit(): void {
    this.userForm = new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      type: new FormControl(0, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      birthday: new FormControl(12-12-12, [Validators.required]),

    })
    this.getData();
  }

  async getData() {
    if(!isNullOrUndefined(this.id)) {
      try {
        let user = this.muserService.getOneById(this.id);
        this.user = await user;
      }catch(err) {
        console.error(err);
      }
      this.userForm.patchValue({
        name: this.user.name,
        surname: this.user.surname,
        patronymic: this.user.patronymic,
        type: this.user.type,
        number: this.user.number,
        email: this.user.email,
        birthday: this.user.birthday,
      })
    }
  }

  async onDelete() {
    try {
      await this.muserService.deleteOneById(this.id);
    } catch(err) {
      console.error(err);
    }
    this.router.navigate(['/users']);
  }

  async onSave() {
    console.log('1');
    if(!isNullOrUndefined(this.id)){
      try {
        await this.muserService.putOneById(this.id, this.userForm.value);
        console.log(this.userForm.value);
      } catch(err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.muserService.postOne(this.userForm.value);
        console.log(res);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch(err) {
        console.error(err);
      }
    }
  }
}
