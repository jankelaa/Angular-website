import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  {path: 'agent', component: AgentComponent},
  {path: 'admin', component: AdminComponent},
  {path: "",component:HomeComponent},
  { path: '**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
