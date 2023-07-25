import { Component, OnInit } from '@angular/core';
import { Student, TestsApi } from './../model/register.model';
import { RegisterService } from './../services/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RegisterService } from './../services/register.service';
import { AlertController, LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

//import { HttpClientModule } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Subjects, Test, Year } from '../model/question.model';

@Component({
  selector: 'app-take-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  public TestList: Test[] = [];
  public YearList: Year[] = [];
  public SubjectList: Subjects[] = [];
 
  handlerMessage = '';
  roleMessage = '';
  name!: string;
  myForm: NgForm = new NgForm([], []);


@ViewChild('myModal', { static: true }) myModal!: IonModal;

  registrationForm1!: FormGroup;



  constructor( private regServices: RegisterService, private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private router: Router,
    private loadingCtrl: LoadingController) {

   
    this.registrationForm1 = this.formBuilder.group({
      year: ['', Validators.required],
       subject: ['', Validators.required],
      test: ['', [Validators.required]]
     
    });
    


  }
 
  getTest(){
    
    const book : TestsApi = {
      "name":"getTests",
    "param":{
        
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };

    this.regServices.getTests(book)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.TestList = data.response.result.tests;
            console.log(this.TestList);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Tests:', error);
      }
    });

  }
  
  getYear(e: any) {
    console.log(e.detail.value);
   // console.log(id);
    const yera : any = {
      "name":"getYears",
    "param":{
      "subject_id": e.detail.value,
      "student_id": localStorage.getItem('student_id')
      
    }
    };

    this.regServices.getYears(yera)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.YearList = data.response.result.years;
            console.log(this.YearList);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Years:', error);
      }
    });

  }
  
  getSubject(){
    
    const subj : TestsApi = {
      "name":"getSubjects",
    "param":{
        
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };

    this.regServices.getSubjects(subj)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.SubjectList = data.response.result.subjects;
            console.log(this.SubjectList);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Subjects:', error);
      }
    });

  }
  
  async onSubmit() {


  const loading = await this.loadingCtrl.create({message: 'Creating.....'});
  await loading.present();


    //localStorage.setItem('fullname', this.registrationForm1.value.fullName);
   // localStorage.setItem('schoolName', this.registrationForm1.value.schoolName);

    if (this.registrationForm1.valid) {
     
      const test : any = {
        "name":"takeTest",
      "param":{
            "test": this.registrationForm1.value.test,
         "year": this.registrationForm1.value.year,
         "subject": this.registrationForm1.value.subject,
         "student_id": localStorage.getItem('student_id'),
       
          }
      };
      console.log(test);

      this.regServices.createTest(test)
    .subscribe({
      next: (data) => {
        console.log('Test  created successfully:', data);

        // Do something with the response data here
        if(data.response.status == 200){

          localStorage.setItem('takeTest_id', data.response.result);
          loading.dismiss();

           this.router.navigateByUrl('instruction');
          
        } else {
          loading.dismiss();
          this.presentAlertF('Failed Response', 'Failed to Start Test Try again Later');
          console.log('Failed to Start Test')
          
        }
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error creating record:', error);
      }
    });

      
    }
  }

  goHome() {
    return this.router.navigateByUrl('home');
  }
  async ngOnInit() {
    console.log(localStorage.getItem('student_id'));
    this.getSubject();
    this.getTest();
    //this.getYear();
  
  }


  async presentAlertF(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
     
    });

    await alert.present();
  }
}
