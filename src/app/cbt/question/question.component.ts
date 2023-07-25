import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register.service';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
 
export class QuestionComponent {
  @Input()
  questionid!: number;
   @Input()
  indexing!: number;
  marking: any[] = [];
  
  @ViewChild('modal') modal!: IonModal;
   modalImage!: string;
  quest: any = [];
  options: any = [];
  question_id: any;



  constructor( private regServices: RegisterService, private modalController: ModalController) { }

  ngOnInit() {
    // this.question_id = this.questionid;
    // let testDetails: any = localStorage.getItem('testDetail');
   
    // const conv = JSON.parse(testDetails);
    // const test_id = conv.type;
     this.getQuestions();
    this.getQuestion(this.questionid);

  }


  getQuestions(){
    
    const question : any = {
      "name":"getQuestions",
    "param":{
        
      "tt_id": localStorage.getItem('takeTest_id'),
      // "tt_id": '13',
      "student_id": localStorage.getItem('student_id'), 
      
    }
    };
    console.log(question);
    this.regServices.getQuestions(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.marking = data.response.result.questions;
            console.log(this.marking);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Questions:', error);
      }
    });

  }

  getQuestion(question_id: any){
    
    const question : any = {
      "name":"getQuestion",
    "param":{
        
      "marking_id": question_id,
      
      
    }
    };

    this.regServices.getQuestion(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.quest = data.response.result.question;
            console.log(this.quest);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Questions:', error);
      }
    });

  }

  handleRadioChange(event: any, id:any) {
    const selectedValue = event.detail.value;
    console.log('Selected value:', selectedValue + id);
    // Perform any additional logic based on the selected value

    const options : any = {
      "name":"updateOptions",
    "param":{
      
       "marking_id": id,
      "answer": selectedValue, 
      
    }
    };
    console.log(options);
    this.regServices.updateOptions(options)
    .subscribe({
      next: (data) => {
      
        if(data.response.status == 200){
          console.log(data);
          
        }
      },
      error: (error) => {
      
        console.error('Error saving Option:', error);
      }
    });

  }

  async openModal(imageUrl: string) {
    this.modalImage = 'https://ulearnlms.net/igcse/images/'+imageUrl;
    await this.modal.present();
  }

   closeModal() {
    this.modal.dismiss();
  }

}