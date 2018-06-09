
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

import { Course, Query } from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CourseService {

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

	public getAllCourses(searchTerm = ''): Observable<Course[]> {
		return this.apollo.watchQuery<Query>({
			pollInterval: 500,
			query: gql`
				query allCourses($searchTerm: String) {
					allCourses(searchTerm: $searchTerm) {
						id,
						title,
						author,
						description,
						topic,
						url,
						voteCount,
					}
				}
			`,
			variables: {
				searchTerm: searchTerm
			}
		})
			.valueChanges
			.pipe(
				map(result => result.data.allCourses)
			);
	}

	public upvoteCourse(id: string) {
		return this.apollo.mutate({
			mutation: gql`
				mutation upvote($id: String!) {
					upvote(id: $id) {
						id,
						title,
						author,
						voteCount
					}
				}
			`,
			variables: {
				id: id
			}
		});
	}

	public downvoteCourse(id: string) {
		return this.apollo.mutate({
			mutation: gql`
				mutation downvote($id: String!) {
					downvote(id: $id) {
						id,
						title,
						author,
						voteCount
					}
				}
			`,
			variables: {
				id: id
			}
		});
	}
}
