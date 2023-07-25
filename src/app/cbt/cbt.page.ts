import { Component, OnInit, OnDestroy ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-cbt',
  templateUrl: './cbt.page.html',
  styleUrls: ['./cbt.page.scss'],
})
export class CbtPage implements OnInit {
   @ViewChild(IonContent)
  content!: IonContent;
 times: any;
  duration: any;
  private isClosingApp = false;

 
  question_id: any;
  constructor(private route: ActivatedRoute, private router: Router, private regServices: RegisterService,private alertController: AlertController,) { }
 
  async ngOnInit() {

  const id = localStorage.getItem('takeTest_id');
    console.log(id);
    await this.getTestTime(id);

    
 
    
  }
  ngOnDestroy() {
   
    // Function to be called when the page is destroyed
    if (!this.isClosingApp) {
      this.getScore();
    }
  }
ionViewWillLeave() {
    // Function to be called when leaving the page or hiding the page
    this.getScore();
  }

  getTestTime(id: any){
    
    const testTime : any = {
      "name":"testTime",
    "param":{
        
      "id": id, 
      
    }
    };
    console.log(testTime);
    this.regServices.getTests(testTime)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.times = data.response.result.duration;
             this.formatTime(this.times);
         //   console.log(this.times);
          
          } else {
             console.log(data);
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Timer:', error);
      }
    });

  }
  

  // formatTime(minutes: number): string {
  //   let seconds = minutes * 60;

  //   const interval = setInterval(() => {
  //     const mins = Math.floor(seconds / 60);
  //     const secs = seconds % 60;
  //     this.times = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  //     seconds--;

  //     if (seconds < 0) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return `${minutes} minutes`;
  // }
  

  formatTime(minutes: number): void {
  let seconds = minutes * 60;

  const interval = setInterval(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    this.times = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      this.timerComplete(); // Call the function when the timer reaches zero
    }
  }, 1000);
}

timerComplete(): void {
  // Function logic to be executed when the timer reaches zero
  // You can add your own code here
}
  submitFunc() {
    this.router.navigateByUrl('/result');
  }
 
  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Are you you want to Submit your Test ?',
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
           this.submitFunc();


          }
        },
      ],
    });

    await alert.present();
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

    App.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        this.isClosingApp = true;
        this.regServices.getResult(question)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
           // this.score = data.response.result.score;
            console.log(data);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Results:', error);
      }
    });
      }
    });
   
  }
scrollToTop() {
  this.content.scrollToTop(300); // 300ms animation duration (optional)
}
}
