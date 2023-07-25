import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expire',
  templateUrl: './expiry.page.html',
  styleUrls: ['./expiry.page.scss'],
})
export class ExpiryPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  toClass(){
    this.router.navigateByUrl('activate');
  }
}
