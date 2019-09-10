import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailCheck: null,
    interfaceStyle: null,
    subscriptionTypes: null,
    notes: null
  };

  startDate: Date;
  userSettings: UserSettings = {...this.originalUserSettings};
  postError = false;
  postErrorMessage = ' ';
  subscriptionTypes: Observable<string[]>;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
  }
  
  singleModel = "On";

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

  onHttpError(errorResponse: any) {
    console.log('error!', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid, form.value);

      if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    }
    else {
      this.postError = true;
      this.postErrorMessage = 'please fix the above errors';
    }
  }
  
}
