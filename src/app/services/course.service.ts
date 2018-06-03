
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

import { Course, Query } from '../models';

@Injectable({
	providedIn: 'root'
})
export class CourseService {

	constructor(
		private apollo: Apollo
	) {}

	getAllCourses(searchTerm: string) {
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

	upvoteCourse(id: string) {
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

	downvoteCourse(id: string) {
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
