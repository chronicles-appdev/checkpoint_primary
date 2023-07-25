import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  result: any=[];
  score!: any;
  id: any;
  constructor( private regServices: RegisterService) { }

  ngOnInit() {
    this.id = localStorage.getItem('takeTest_id');
    this.getScore();
    this.getDetails();
    
  }
  getPerc(num: any, correct: any) {
    return (correct * 100 ) /num;
  }
  getLoad(num: any, correct: any) {
    return correct /num;
  }
  getScore() {
    const tt_id = localStorage.getItem('takeTest_id');
    const question : any = {
      "name":"getScore",
    "param":{
        
      "tt_id": localStorage.getItem('takeTest_id'),
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };
    console.log(question);
    this.regServices.getResult(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.score = data.response.result.score;
            console.log(this.score);
          
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
      "name":"getResult",
    "param":{
        
      "tt_id": localStorage.getItem('takeTest_id'),
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };
    console.log(question);
    this.regServices.getResult(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.result = data.response.result.tests;
            console.log(this.result.num_question);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Results:', error);
      }
    });
  }

}
