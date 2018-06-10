import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../../../models';
import { CarsService } from '../../../services/cars.service';

@Component({
	selector: 'app-car-item',
	templateUrl: './car-item.component.html',
	styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent {
	@Input() public car: Car;
}
