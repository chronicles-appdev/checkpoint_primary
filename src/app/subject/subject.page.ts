import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  subjects!: any[];
  
  constructor( private regServices: RegisterService, private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getSubject();
  }

  async onclick(id: any) {
   
      const subjsect : any = {
        "name":"regSubject",
      "param":{
        "subject_id": id,
        "student_id": localStorage.getItem('student_id')
      
       
          }
      };
    

      this.regServices.createSubject(subjsect)
       .subscribe({
        next: (data) => {
       
        if(data.response.status == 200){

        //  console.log(data);
         
        }
      },
      error: (error) => {
       
        console.error('Error Submitting Subjects:', error);
      }
    });

      
    }
  
  async onCheck() {
 
  

    const loading = await this.loadingCtrl.create({message: 'Creating.....'});
    await loading.present();


 
     
      const checksubject : any = {
        "name":"checkSubject",
      "param":{
        "student_id": localStorage.getItem('student_id')
      
       
          }
      };
      console.log(checksubject);

      this.regServices.checkSubjects(checksubject)
       .subscribe({
        next: (data) => {
     

        // Do something with the response data here
        if(data.response.status == 200){
          console.log('Subjects Submitted successfully:', data);
          loading.dismiss();
            this.presentAlert('Success Alert', 'Subjects Submitted Successfully');
          localStorage.setItem('subjects', 'success');
        } else {
             console.log('Subjects Not  Submitted successfully:', data);
          loading.dismiss();
            this.presentAlertF('Failed Alert', 'You Must Select Atleats 5 Subjects');
        }
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error Submitting Subjects:', error);
      }
    });

      
    }
  




  getSubject(){
    
    const subj : any = {
      "name":"getSubjectsNew",
    "param":{
        
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };

    this.regServices.getSubjects(subj)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.subjects = data.response.result.subjects;
           // console.log(this.subjects);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Subjects:', error);
      }
    });

  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Go to Activate',
          cssClass: 'custom-alert-button',
          handler: () => {
          
           this.router.navigateByUrl('activate');
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertF(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
     
    });

    await alert.present();
  }


  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Are you you want to Submit these selected Subjects ?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',

        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
           this.onCheck();


          }
        },
      ],
    });

    await alert.present();
  }

}
