
import { RegisterService } from './../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activate',
  templateUrl: './activate.page.html',
  styleUrls: ['./activate.page.scss'],
})
export class ActivatePage implements OnInit {
 myForm: NgForm = new NgForm([], []);
  registrationForm1: FormGroup;
  

 activationCode!: string;

  onInputChange(event: any) {
    this.activationCode = event.target.value.toUpperCase();
  }
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
    },
  ];
  selectedSegment ='activate';
  handlerMessage = '';
  roleMessage = '';


  

  student_id!: string;








  ngOnInit() {
   // localStorage.removeItem("expiry_date");
    console.log(localStorage.getItem('expiry_date'));
  }

  async onSubmit() {
   

  const loading = await this.loadingCtrl.create({message: 'Creating.....'});
  await loading.present();
      const activate : any = {
        "name":"activate1",
      "param":{
        "act_code": this.registrationForm1.value.activationCode,
   
        "student_id": localStorage.getItem('student_id'),

          }
      };
      console.log(activate);
      this.studentService.activate(activate)
    .subscribe({
      next: (data) => {
       // console.log('Record created successfully:', data);

        // Do something with the response data here
        if(data.response.status == 200){
         loading.dismiss();
            console.log('Record created successfully:', data);
            localStorage.setItem('activated', data.response.result.results.key);
            localStorage.setItem('expiry_date', data.response.result.results.expiry_date);
              this.presentAlert('Success Alert', 'IGCSE Activated Successfully', '/home', 'Go to Dashboard');

          // }else{

          // }

        }else{
          loading.dismiss();     
          this.presentAlert('Failed Alert', data.response.result, '/activate', 'Cancel');
          //console.log('Failure:', data);
        }
      },
      error: (error) => {
        console.error('Error Activating record:', error);
      }
    });

    
  }
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private studentService: RegisterService,
    private loadingCtrl: LoadingController) {
   
    this.registrationForm1 = this.formBuilder.group({
     
      activationCode: ['', Validators.required]
    });
  }

 

  async presentAlert(header: string, message: string, link: string, link_text: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: link_text,
          cssClass: 'custom-alert-button',
          handler: () => {
            // Replace this URL with the one you want to navigate to
            this.router.navigateByUrl(link);
          }
        }
      ]
    });

    await alert.present();
  }



}
