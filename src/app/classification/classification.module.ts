import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationRoutingModule } from './classification-routing.module';
import { ClassificationComponent } from './classification.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ClassificationComponent
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    FlexLayoutModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ClassificationModule { }
