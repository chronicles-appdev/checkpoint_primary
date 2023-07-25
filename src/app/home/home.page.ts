import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  swiperModules = [IonicSlides];
  result: any = 0;
  count: any = 0;
  history: any = [];
  fullname: any;
  constructor(private http: HttpClient, private menuController: MenuController, private regServices: RegisterService) {
    this.fullname = localStorage.getItem('fullname');
    console.log(this.fullname);
 }

  ngOnInit() {
   
    this.getDetails();
    this.getTaken();
    this.getHistory();
  }
openSideMenu() {
  this.menuController.open('start');
}
  
  getPer(score:any, total:any) {
    return score * 100 / total;
  }
  
  getHistory() {
  
    const question : any = {
      "name":"getHistory",
    "param":{
        
    
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };
    console.log(question);
    this.regServices.getResult(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.history = data.response.result.history;
            console.log(this.history);
          
          }else{
            console.log(data);
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Results:', error);
      }
    });
  }
  getDetails() {
    const tt_id = localStorage.getItem('takeTest_id');
    const question : any = {
      "name":"getPassed",
    "param":{
        
     // "tt_id": localStorage.getItem('takeTest_id'),
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };
    console.log(question);
    this.regServices.getResult(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.result = data.response.result.passed;
            console.log(this.result);
          
          }else{
            console.log(data);
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Results:', error);
      }
    });
  }
  getTaken() {
    const tt_id = localStorage.getItem('takeTest_id');
    const question : any = {
      "name":"getTotalTest",
    "param":{
        
    //  "tt_id": localStorage.getItem('takeTest_id'),
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };
    console.log(question);
    this.regServices.getResult(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.count = data.response.result.count;
            console.log(this.result);
          
          } else {
               console.log(data);
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Results:', error);
      }
    });
  }

}
