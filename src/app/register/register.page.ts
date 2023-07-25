import { Student } from './../model/register.model';
import { RegisterService } from './../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {
  handlerMessage = '';
  roleMessage = '';
  name!: string;
  myForm: NgForm = new NgForm([], []);

  //myForm: FormGroup;
  fullName!: string;
  //class!: string;
  schoolName!: string;
  email!: string;
  phoneNumber!: string;
  activationCode!: string;


@ViewChild('myModal', { static: true }) myModal!: IonModal;


registrationForm1: FormGroup;

OnInit(){

 
}

get emailControl() {
  return this.myForm.control.get('email');
}

isRequiredError() {
  return this.emailControl?.hasError('required') && (this.emailControl.dirty || this.emailControl.touched);
}

isEmailError() {
  return this.emailControl?.hasError('email') && (this.emailControl.dirty || this.emailControl.touched);
}
performAction() {
  this.myModal.present();
}


  async onSubmit() {


  const loading = await this.loadingCtrl.create({message: 'Creating.....'});
  await loading.present();


    localStorage.setItem('fullname', this.registrationForm1.value.fullName);
   // localStorage.setItem('schoolName', this.registrationForm1.value.schoolName);

    if (this.registrationForm1.valid) {
     
      const student : Student = {
        "name":"student",
      "param":{
            "fullname": this.registrationForm1.value.fullName,
         "email": this.registrationForm1.value.email,
         "class": this.registrationForm1.value.class,
          "phone": this.registrationForm1.value.phoneNumber
          }
      };
      console.log(student);

      this.regServices.createStudent(student)
    .subscribe({
      next: (data) => {
        console.log('Record created successfully:', data);

        // Do something with the response data here
        if(data.response.status == 200){

          localStorage.setItem('fullname', this.registrationForm1.value.fullName);
          localStorage.setItem('student_id', data.response.result);
          localStorage.setItem('email', this.registrationForm1.value.email);
          localStorage.setItem('phone', this.registrationForm1.value.phoneNumber);
          localStorage.setItem('class', this.registrationForm1.value.class);

          console.log(localStorage.getItem("student_id"));
          loading.dismiss();
          this.presentAlert('Success Alert', 'Registration Successful Click the Button below to select Subjects');
        }
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error creating record:', error);
      }
    });

      // TODO: Submit form data to server
    }
  }

 

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private regServices: RegisterService, private router: Router,
    private loadingCtrl: LoadingController) {

   
    this.registrationForm1 = this.formBuilder.group({
      fullName: ['', Validators.required],
       class: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
    // this.myForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    // });


  }




  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Select Subects',
          cssClass: 'custom-alert-button',
          handler: () => {
            // Replace this URL with the one you want to navigate to
           // window.location.href = 'activate';
           this.router.navigateByUrl('activate');
          }
        }
      ]
    });

    await alert.present();
  }




}
