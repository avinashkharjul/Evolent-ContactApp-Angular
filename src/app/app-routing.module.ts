import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './ContactApp/add/add.component';
import { DeleteComponent } from './ContactApp/delete/delete.component';
import { ListComponent } from './ContactApp/list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'List', component: ListComponent },
  { path: 'Add', component: AddComponent },
  { path: 'Add/:id', component: AddComponent },
  { path : 'Delete/:id', component : DeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
