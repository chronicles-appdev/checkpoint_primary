import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivatePageRoutingModule } from './activate-routing.module';

import { ActivatePage } from './activate.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivatePageRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  declarations: [ActivatePage]
})
export class ActivatePageModule {}
