import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/list/item/item.component';
import { AppRoutingModule } from './/app-routing.module';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { CarItemComponent } from './components/cars-list/car-item/car-item.component';


@NgModule({
	declarations: [
		AppComponent,
		ListComponent,
		ItemComponent,
		CarsListComponent,
		CarItemComponent
	],
	imports: [
		BrowserModule,
		ApolloModule,
		HttpClientModule,
		HttpLinkModule,
		MDBBootstrapModule.forRoot(),
		AppRoutingModule
	],
	schemas: [ NO_ERRORS_SCHEMA ],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(apollo: Apollo,  httpLink: HttpLink) {
		apollo.create({
			link: httpLink.create({uri: 'http://localhost:4000/graphql'}),
			cache: new InMemoryCache()
		});
	}
}
