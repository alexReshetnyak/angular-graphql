import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from '../../models';
import { CarsService } from '../../services/cars.service';
import { CourseService } from '../../services/course.service';

@Component({
	selector: 'app-cars-list',
	templateUrl: './cars-list.component.html',
	styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
	@Input() public searchTerm: string;
	public cars: Observable<Car[]>;

	constructor(
		private carsService: CarsService,
		private courseService: CourseService
	) {}

	ngOnInit() {
		this.cars = this.carsService.getAllCars(this.searchTerm);
		this.subscribeOnSearchChanges();
	}

	private subscribeOnSearchChanges() {
		this.courseService.getSearchTerm()
			.subscribe(searchText => {
				this.cars = this.carsService.getAllCars(searchText);
			});
	}
}
