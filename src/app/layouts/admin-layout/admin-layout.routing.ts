import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BilleterasComponent } from '../../pages/billeteras/billeteras.component';
import { OperacionesComponent } from '../../pages/operaciones/operaciones.component';
//import { RecargasComponent } from 'src/app/pages/recargas/recargas.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'billeteras',     component: BilleterasComponent },
    { path: 'operaciones',    component: OperacionesComponent }
    //{ path: 'recargas',       component: RecargasComponent }
];
