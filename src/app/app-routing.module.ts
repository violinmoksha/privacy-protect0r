import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuFormComponent } from './components/menu-form/menu-form.component'
import { DataFormComponent } from './components/data-form/data-form.component'

const routes: Routes = [
  { path: '', redirectTo: '/data-form/mailIDABCD1234GoesHere', pathMatch: 'full' },
  {
    path: 'menu-form',
    component: MenuFormComponent
  },
  {
    path: 'data-form/:id',
    component: DataFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
