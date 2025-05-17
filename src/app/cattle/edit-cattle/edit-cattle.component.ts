import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {CattleListService} from '../../service/cattle-list.service';
import {Router} from '@angular/router';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-cattle',
  imports: [
    FormsModule,
    NgIf,
    NzButtonComponent,
    NzInputDirective,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit-cattle.component.html',
  styleUrl: './edit-cattle.component.scss'
})
export class EditCattleComponent implements OnInit {
  readonly nzModalData = inject(NZ_MODAL_DATA);
  cattleId!: string
  private fb = inject(FormBuilder);
  cattleListForm:FormGroup = this.fb.group({
    breed: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.maxLength(15)]],
    weight: [null, [Validators.required, Validators.min(10),  Validators.max(300)]],
    price: [null, [Validators.required, Validators.min(100), Validators.max(1000000)]],
    status: ['available', Validators.required],
    date: [new Date()],
    username: ['']
  });

  constructor(private cattleListService: CattleListService, private router: Router, private modalRef: NzModalRef,) { }

  ngOnInit(): void {
    this.cattleId = this.nzModalData.cattleId;
    console.log(this.cattleId);
    this.cattleListService.onEdit(this.cattleId).subscribe({
      next: data => {
        this.cattleListForm.patchValue(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onSubmitList() {
    if(this.cattleListForm.valid){
      this.cattleListForm.value.date = new Date();
      this.cattleListService.updateList(this.cattleId, this.cattleListForm.value).subscribe((res)=>{
        this.cattleListForm.reset();
        this.modalRef.close(true);
      })
    }
  }
}
