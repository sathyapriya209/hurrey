import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch/batch.component';
import { InstituteComponent } from './institute/institute.component';


const routes: Routes = [
  { path: 'institute',
    component: InstituteComponent
  },
  { path: 'batch',
    component: BatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
