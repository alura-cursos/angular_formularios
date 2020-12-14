import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CabecalhoComponent],
  imports: [CommonModule, RouterModule],
  exports: [CabecalhoComponent],
})
export class CabecalhoModule {}
