import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    // canActivate: [AuthGuard],
    // canActivateChild: [RoleGuard],
    data: { roles: ['user'] },
  },
  // {
  //   path: 'artist',
  //   loadChildren: () =>
  //     import('./features/artist/artist.module').then((m) => m.ArtistModule),
  //   canActivate: [AuthGuard],
  //   canActivateChild: [RoleGuard],
  //   data: { role: 'artist' },
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./features/admin/admin.module').then((m) => m.AdminModule),
  //   canActivate: [AuthGuard],
  //   canActivateChild: [RoleGuard],
  //   data: { role: 'admin' },
  // },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
