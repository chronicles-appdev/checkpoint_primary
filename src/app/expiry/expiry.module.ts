import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpiryPageRoutingModule } from './expiry-routing.module';

import { ExpiryPage } from './expiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpiryPageRoutingModule
  ],
  declarations: [ExpiryPage]
})
export class ExpiryPageModule {}
