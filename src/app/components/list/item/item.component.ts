import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models';
import { CourseService } from '../../../services/course.service';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
	@Input() public course: Course;

	constructor(
		private courseService: CourseService
	) { }

	ngOnInit() {
	}

	downvote(id: string) {
		this.courseService.downvoteCourse(id)
			.subscribe(({data}) => console.log('data downvoted', data)
			, (err) => console.log(err, 'error'));
	}

	upvote(id: string) {
		this.courseService.upvoteCourse(id)
			.subscribe(({data}) => console.log('data upvoted', data)
			, (err) => console.log(err, 'error'));
	}

}
