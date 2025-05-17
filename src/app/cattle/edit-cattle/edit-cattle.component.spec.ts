import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCattleComponent } from './edit-cattle.component';

describe('EditCattleComponent', () => {
  let component: EditCattleComponent;
  let fixture: ComponentFixture<EditCattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCattleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
