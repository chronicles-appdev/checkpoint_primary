import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register.service';
import { IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    currentQuestionIndex: number = 0;
  @ViewChild('modal') modal!: IonModal;
   modalImage!: string;
  quest: any = [];
  options: any = [];
  question_id: any;

registrationForm1: FormGroup;
 dataArray: string[] = [];

  constructor(private formBuilder: FormBuilder, private regServices: RegisterService, private modalController: ModalController) { 

     this.registrationForm1 = this.formBuilder.group({
       answer: ['', Validators.required],
       test_id: ['', Validators.required],
    
     });
    
    
  }

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

  async openModal(imageUrl: string) {
    this.modalImage = 'https://ulearnlms.net/checkpoint/images/'+imageUrl;
    await this.modal.present();
  }

   closeModal() {
    this.modal.dismiss();
  }


  prevQuestion() {
    console.log(this.registrationForm1.value.answer);
    this.onSubmit();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    console.log(this.registrationForm1.value.answer);
   // console.log(this.marking[this.currentQuestionIndex]?.id);

    if (this.currentQuestionIndex < this.marking.length - 1) {

      this.onSubmit();
      this.currentQuestionIndex++;
    }
   
  }



   onSubmit() {
     const id = this.marking[this.currentQuestionIndex]?.id;
     console.log(id);
      const answer : any = {
        "name":"answer",
      "param":{
            "answer": this.registrationForm1.value.answer,
            "test_id": this.registrationForm1.value.test_id,
       
          }
      };
      console.log(answer);

      this.regServices.createStudent(answer)
    .subscribe({
      next: (data) => {
        console.log('Answer saved successfully:', data);

       
        
      },
      error: (error) => {
      
        console.error('Error saving Answer:', error);
      }
    });

      // TODO: Submit form data to server
    
  }

 
}