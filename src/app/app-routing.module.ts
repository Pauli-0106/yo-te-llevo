import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; 
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const redireccionarLogin = () => redirectUnauthorizedTo(['/login'])

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard], 
    data:{authGuardPipe:redireccionarLogin},
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'actividad',
    loadChildren: () => import('./actividad/actividad.module').then(m => m.ActividadPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'detalle-viaje',
    loadChildren: () => import('./detalle-viaje/detalle-viaje.module').then(m => m.DetalleViajePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'dende-llevo',
    loadChildren: () => import('./dende-llevo/dende-llevo.module').then(m => m.DendeLlevoPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'donde-voy',
    loadChildren: () => import('./donde-voy/donde-voy.module').then(m => m.DondeVoyPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'ruta-tu',
    loadChildren: () => import('./ruta-tu/ruta-tu.module').then(m => m.RutaTuPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'ruta-yo',
    loadChildren: () => import('./ruta-yo/ruta-yo.module').then(m => m.RutaYoPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'tu-usuario',
    loadChildren: () => import('./tu-usuario/tu-usuario.module').then(m => m.TuUsuarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario-yo',
    loadChildren: () => import('./usuario-yo/usuario-yo.module').then(m => m.UsuarioYoPageModule),
    
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaPageModule)
  },
  { path: '**',
    component: PageNotFoundComponent
  },  {
    path: 'apitest',
    loadChildren: () => import('./apitest/apitest.module').then( m => m.ApitestPageModule)
  },
  {
    path: 'usuario-viaje',
    loadChildren: () => import('./usuario-viaje/usuario-viaje.module').then( m => m.UsuarioViajePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
