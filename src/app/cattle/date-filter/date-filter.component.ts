import {Component, Input} from '@angular/core';
import {NzDatePickerComponent, NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

import {DateForm} from '../cattle-list/cattle-list.component';

@Component({
  selector: 'app-date-filter',
  imports: [
    NzDatePickerModule,
    NzDatePickerComponent,
    ReactiveFormsModule
  ],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss'
})
export class DateFilterComponent {
  @Input() dateForm!: FormGroup<DateForm>;
  @Input() dateFilter={};
}
