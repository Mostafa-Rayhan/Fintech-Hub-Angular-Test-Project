import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './copmonents/user-list/user-list.component';
import { UserFormComponent } from './copmonents/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'create-user', component: UserFormComponent },
  { path: 'edit-user/:id', component: UserFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Catch-all redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
