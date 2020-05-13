import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { PasswordRecoveryComponent } from '../../pages/pw-recovery/pw-recovery.component';
import { PasswordResetComponent } from '../../pages/pw-reset/pw-reset.component';
import { AccountConfirmedComponent } from '../../pages/account-confirmed/account-confirmed.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'pw-recovery',    component: PasswordRecoveryComponent },
    { path: 'pw-reset/:userID/:resetPasswordToken',       component: PasswordResetComponent },
    { path: 'account-confirmed/:userID/:confirmationToken', component: AccountConfirmedComponent }
];
