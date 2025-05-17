import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {DateFilterComponent} from '../date-filter/date-filter.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {AddCattleComponent} from '../add-cattle/add-cattle.component';
import {CattleListService} from '../../service/cattle-list.service';
import {map, switchMap} from 'rxjs';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {EditCattleComponent} from '../edit-cattle/edit-cattle.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import dayjs from 'dayjs';
import {Cattle} from '../../interface/cattle';

@Component({
  selector: 'app-cattle-list',
  imports: [
    NavbarComponent,
    DateFilterComponent,
    NzButtonComponent,
    NzModalModule,
    NgForOf,
    DecimalPipe,
    DatePipe,
    NgIf
  ],
  templateUrl: './cattle-list.component.html',
  styleUrl: './cattle-list.component.scss'
})
export class CattleListComponent implements OnInit {
  private fb = inject(FormBuilder);

  dateForm: FormGroup = this.fb.group({
    date: []
  });
  dateFilter={
    date:'',
  }
  allList: Cattle[] = [];
  formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');
  constructor(private modal: NzModalService, private cattleListService: CattleListService) {
  }

  ngOnInit(): void {
    this.getAvailableList();
    this.dateFilterValueChanges();
  }

  getAvailableList() {
    this.cattleListService.getAllList().pipe(
      map((data: Cattle[]) => data.filter(cattle => cattle.status === 'available'))).subscribe({
      next: (data: any) => {
        console.log('all data', data);
        this.allList = data;
      },
      error: (err) => {
        console.error();
      }
    })
  }
  addNewCattle() {
    const modal = this.modal.create({
      nzWidth:'50%',
      nzTitle: 'Eid-ul-Adha Cattle Market App',
      nzContent: AddCattleComponent,
      nzMaskClosable:true,
      nzFooter:null
    });
    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.getAvailableList();
      }
    });
  }

  onDeleteBtn(cattleId: string) {
    const isConfirmed = window.confirm('Are you sure you want to delete this cattle?');

    if (isConfirmed) {
      this.cattleListService.onDeleted(cattleId).pipe(
        switchMap(() => this.cattleListService.getAllList())).subscribe({
          next: (todos) => {
            this.allList = todos;
          },
          error: (err) => {
            console.error(err);
          }});
    } else {
      console.log('Deletion canceled.');
    }
  }


  onEditBtn(cattleId: string) {
    const modal = this.modal.create({
      nzWidth: '50%',
      nzTitle: 'Edit Cattle Market App',
      nzContent: EditCattleComponent,
      nzMaskClosable: true,
      nzFooter: null,
      nzData: { cattleId: cattleId }
    });

    modal.afterClose.subscribe(result => {
      if (result === true) {
        this.getAvailableList();
      }
    });
  }

  dateFilterValueChanges() {
    console.log(this.dateForm.controls['date'].value);
    this.dateForm.get('date')?.valueChanges.subscribe((date) => {
      if (date) {
        this.dateFilter.date = this.formatDate(date);
      } else {
        this.dateFilter.date = '';
      }
      this.applyDateFilter();
    });
  }


  applyDateFilter() {
    this.cattleListService.getAllList().pipe(map((data: any[]) => {
        return data.filter(cattle =>
          cattle.status === 'available' && (!this.dateFilter.date || this.formatDate(cattle.date) === this.dateFilter.date)
        );
      })).subscribe({
      next: (filteredData:Cattle[]) => {
        this.allList = filteredData;
      },
      error: (err) => {
        console.error( err);
      }
    });
  }

}

export interface DateForm {
  date: FormControl;
}
