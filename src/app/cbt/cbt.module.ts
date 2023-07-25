import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbtPageRoutingModule } from './cbt-routing.module';

import { CbtPage } from './cbt.page';
import { QuestionComponent } from './question/question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbtPageRoutingModule
  ],
  declarations: [CbtPage, QuestionComponent]
})
export class CbtPageModule {}
