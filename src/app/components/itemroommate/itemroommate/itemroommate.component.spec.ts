import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemroommateComponent } from './itemroommate.component';

describe('ItemroommateComponent', () => {
  let component: ItemroommateComponent;
  let fixture: ComponentFixture<ItemroommateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemroommateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemroommateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
