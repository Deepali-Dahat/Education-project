import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEbooksComponent } from './add-ebooks.component';

describe('AddEbooksComponent', () => {
  let component: AddEbooksComponent;
  let fixture: ComponentFixture<AddEbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEbooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
