import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { CasoSimilaridadeComponent } from './casoSimilaridade/casoSimilaridade.component';
import { CasoComponent } from './caso/caso.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';


const routes: Routes = [{
  path: '',canActivate: [LoginService], children: [
      { path: 'principal', component: PrincipalComponent },
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'busca', component: CasoSimilaridadeComponent },
      { 
        path: 'caso', 
        component: CasoComponent, 
        data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] }
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
