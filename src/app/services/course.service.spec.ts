import { TestBed, inject } from '@angular/core/testing';

import { CourseService } from './course.service';
import { Course } from '../models/course';

describe('CourseService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CourseService]
		});
	});

	it('should be created', inject([CourseService], (service: CourseService) => {
		expect(service).toBeTruthy();
	}));
});
