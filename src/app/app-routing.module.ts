import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VigilanteGuard } from './vigilante.guard';
import { PreloadAllModules } from '@angular/router';
const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, 
{ path: 'dasboard', 
loadChildren: () => import('./dasboard/dasboard.module').then(m => m.DasboardModule),
canActivate:[VigilanteGuard]
},
{ path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    
    {
      preloadingStrategy: PreloadAllModules
    }
  
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
