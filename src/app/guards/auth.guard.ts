import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // check if the user is logged in
      // const student_id = localStorage.getItem('student_id');
      // const student_name = localStorage.getItem('student_name');

      if (localStorage.getItem('student_id')) {
       // if (localStorage.getItem('subjects')) {
           if(localStorage.getItem('activated')){

            // Retrieve date from local storage
            const storedDate = localStorage.getItem('expiry_date');


            if (!storedDate) {
              console.log('DateGuard: stored date is null or empty.');
              return false;
            }
                // Convert storedDate to a Date object
                const parsedStoredDate = new Date(storedDate);

            // Get current date
            const currentDate = new Date();

            // Compare dates
            if (parsedStoredDate < currentDate) {
              console.log('DateGuard: stored date is in the past.');
              this.router.navigate(['/expiry']);
            } else {
              console.log('DateGuard: stored date is valid.');
              return true;
            }



        }else{
          this.router.navigate(['/activate']);
        }
       

      }else{
        this.router.navigate(['/register']);
      }

    return false;
  }

}
