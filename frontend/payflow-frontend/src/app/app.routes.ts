import { Routes } from '@angular/router'
import { Login } from './pages/login/login'
import { Dashboard } from './pages/dashboard/dashboard'
import { Register } from './pages/register/register'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'register', component: Register }
]
