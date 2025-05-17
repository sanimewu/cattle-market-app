import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NgIf} from '@angular/common';
import {CattleListService} from '../../service/cattle-list.service';
import {Router} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-cattle',
  imports: [
    NzInputDirective,
    ReactiveFormsModule,
    NzButtonComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgIf
  ],
  templateUrl: './add-cattle.component.html',
  styleUrl: './add-cattle.component.scss'
})
export class AddCattleComponent implements OnInit {
  private fb = inject(FormBuilder);
  cattleListForm = this.fb.group({
    breed: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.maxLength(15)]],
    weight: [null, [Validators.required, Validators.min(10),  Validators.max(300)]],
    price: [null, [Validators.required, Validators.min(100), Validators.max(1000000)]],
    status: ['available', Validators.required],
    date: [new Date()],
    username: ['']
  });

  username = localStorage.getItem('userEmail');

  constructor(private cattleListService: CattleListService, private router: Router, private modalRef: NzModalRef,) { }

  ngOnInit(): void {

  }

  onSubmitList() {
    const data = {
      ...this.cattleListForm.value,
      date: new Date().toISOString(),
      username: this.username,
    };
    this.cattleListService.createList(data).subscribe({
      next: (res) => {
        this.cattleListForm.reset();
        this.modalRef.close(true);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
