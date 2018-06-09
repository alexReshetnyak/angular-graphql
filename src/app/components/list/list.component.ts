import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Course } from '../../models';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	@Input() public searchTerm: string;
	public courses: Observable<Course[]>;

	constructor(
		private courseService: CourseService
	) {}

	ngOnInit() {
		this.courses = this.courseService.getAllCourses(this.searchTerm);
		this.subscribeOnSearchChanges();
	}

	private subscribeOnSearchChanges() {
		this.courseService.getSearchTerm()
			.subscribe(searchText => {
				this.courses = this.courseService.getAllCourses(searchText);
			});
	}
}
