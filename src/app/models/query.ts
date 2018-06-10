import { Course } from './course';
import { Car } from './car';

export interface Query {
	allCourses: Course[];
	allCars: Car[];
}
