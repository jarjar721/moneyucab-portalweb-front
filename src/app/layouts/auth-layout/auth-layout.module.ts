// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { HttpClientModule } from '@angular/common/http';

// Components
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { PasswordRecoveryComponent } from '../../pages/pw-recovery/pw-recovery.component';
import { PasswordResetComponent } from '../../pages/pw-reset/pw-reset.component';

// Services
import { UsuarioService } from 'src/app/shared/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordRecoveryComponent,
    PasswordResetComponent
  ],
  providers: [UsuarioService]
})
export class AuthLayoutModule { }
