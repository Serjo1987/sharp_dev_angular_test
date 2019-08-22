import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLoggedUserTransactionsComponent } from './list-of-logged-user-transactions.component';

describe('ListOfLoggedUserTransactionsComponent', () => {
  let component: ListOfLoggedUserTransactionsComponent;
  let fixture: ComponentFixture<ListOfLoggedUserTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfLoggedUserTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfLoggedUserTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
