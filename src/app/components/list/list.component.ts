import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Course } from '../../models';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
	@Input() public searchTerm: string;
	public courses: Observable<Course[]>;

	constructor(
		private courseService: CourseService
	) {}

	ngOnInit() {
		this.courses = this.courseService.getAllCourses(this.searchTerm);
	}

	ngOnChanges(changes: SimpleChanges) {
		this.courses = this.courseService.getAllCourses(this.searchTerm);
	}
}
