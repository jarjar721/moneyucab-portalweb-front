import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Layout Components
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

// External Modules
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

// Page Components under no layout
import { LandingComponent } from './pages/landing/landing.component';
import { RegistrationWizardComponent } from './pages/registration-wizard/registration-wizard.component';
import { RecargasComponent } from './pages/recargas/recargas.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxSpinnerModule, // Para los spinners de carga
    ToastrModule.forRoot({ // Para la notificaciones
      progressBar: true
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LandingComponent,
    RegistrationWizardComponent,
    RecargasComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
