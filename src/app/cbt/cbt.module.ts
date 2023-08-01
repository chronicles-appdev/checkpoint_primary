import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbtPageRoutingModule } from './cbt-routing.module';

import { CbtPage } from './cbt.page';
import { QuestionComponent } from './question/question.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbtPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CbtPage, QuestionComponent]
})
export class CbtPageModule {}
