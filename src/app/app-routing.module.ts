import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';

const routes: Routes = [
	{ path: '', redirectTo: '/courses', pathMatch: 'full' },
	{ path: 'courses', component: ListComponent },
	{ path: 'cars', component: CarsListComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
