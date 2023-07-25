import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.page.html',
  styleUrls: ['./instruction.page.scss'],
})
export class InstructionPage implements OnInit {
  public TestDetailList: any = [];
  

  constructor(private router: Router,  private regServices: RegisterService) { }

  ngOnInit() {
    //console.log(localStorage.getItem('takeTest_id'));
    this.getTestDetails();
  }
  getTestDetails() {
   
    
    const test : any = {
      "name":"getTestDetails",
    "param":{
      "test_id": localStorage.getItem('takeTest_id')
      
    }
    };

    this.regServices.getSearchTests(test)
      .subscribe({
        next: (data) => {
        
          // Do something with the response data here
          if(data.response.status == 200){
            this.TestDetailList = data.response.result.testDetail;
            console.log(this.TestDetailList);
          
          }
        },
      error: (error) => {
      
        console.error('Error fetching  Test Details:', error);
      }
    });

  
  }
  startTest() {
     return  this.router.navigateByUrl('cbt');
  }
  goTest() {
    return  this.router.navigateByUrl('test');
  }
}
