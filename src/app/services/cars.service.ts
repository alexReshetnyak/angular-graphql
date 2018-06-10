
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

import { Car, Query } from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CarsService {

	private _searchTerm: Subject<string> = new Subject();

	public setSearchTerm(searchText: string) {
		this._searchTerm.next(searchText);
	}

	public getSearchTerm(): Observable<string> {
		return this._searchTerm.asObservable();
	}

	constructor(
		private apollo: Apollo
	) {}

	public getAllCars(searchTerm = ''): Observable<Car[]> {
		return this.apollo.watchQuery<Query>({
			pollInterval: 500,
			query: gql`
				query allCars($searchTerm: String) {
					allCars(searchTerm: $searchTerm) {
						id,
						brand,
						model,
						imageUrl,
					}
				}
			`,
			variables: {
				searchTerm: searchTerm
			}
		})
			.valueChanges
			.pipe(
				map(result => result.data.allCars)
			);
	}
}
