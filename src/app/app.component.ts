import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'apollo-link';
import { fromEvent } from 'rxjs';
import { CourseService } from './services/course.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	public title = 'app';
	@ViewChild('searchInput') public searchTerm: ElementRef;

	constructor(
		private courseService: CourseService
	) {}

	ngAfterViewInit() {
		fromEvent(this.searchTerm.nativeElement, 'keyup').pipe(
			debounceTime(500),
			distinctUntilChanged()
		)
			.subscribe((event: KeyboardEvent) => {
				this.courseService.setSearchTerm((<HTMLInputElement>event.target).value);
			});
	}
}
