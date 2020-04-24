// Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPaymentCardModule } from '../../components/payment-card/ng-payment-card.module';
// import { ToastrModule } from 'ngx-toastr';

import { AdminLayoutRoutes } from './admin-layout.routing';

// Components
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BilleterasComponent } from '../../pages/billeteras/billeteras.component';
import { OperacionesComponent } from '../../pages/operaciones/operaciones.component';

// Services

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgPaymentCardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    BilleterasComponent,
    OperacionesComponent
  ]
})

export class AdminLayoutModule {}
