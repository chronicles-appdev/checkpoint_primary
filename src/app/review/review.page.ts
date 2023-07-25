
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register.service';
import { IonModal } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
 @Input()
 questionid!: number;
  
   @ViewChild(IonContent)
   content!: IonContent;
  
   @Input()
  indexing!: number;
  marking: any[] = [];
  
  @ViewChild('modal') modal!: IonModal;
   modalImage!: string;
  quest: any = [];
  options: any = [];
  question_id: any;



  constructor(private route: ActivatedRoute, private regServices: RegisterService, private modalController: ModalController) { }

  ngOnInit() {
     this.route.params.subscribe(params => {

      if(this.route){
        const revId = this.route.snapshot.paramMap.get('id');
      this.getQuestions(revId);

      }


    });

  
  


  }


  getQuestions(rev:any){
    
    const question : any = {
      "name":"getReviews",
    "param":{
        
     // "tt_id": localStorage.getItem('takeTest_id'),
       "tt_id": rev,
     
    }
    };
    console.log(question);
    this.regServices.getQuestions(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.marking = data.response.result.question;
            console.log(this.marking);
          
          } else {
             console.log(data);
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Questions:', error);
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
  
  
scrollToTop() {
  this.content.scrollToTop(300); // 300ms animation duration (optional)
}
}