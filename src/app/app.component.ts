import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController } from '@ionic/angular';
//import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController) { }
  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exit IGCSE MasterPrep?',
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
            App.exitApp();


          }
        },
      ],
    });

    await alert.present();
  }

}
