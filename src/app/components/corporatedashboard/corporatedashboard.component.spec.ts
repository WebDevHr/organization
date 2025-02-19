import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatedashboardComponent } from './corporatedashboard.component';

describe('CorporatedashboardComponent', () => {
  let component: CorporatedashboardComponent;
  let fixture: ComponentFixture<CorporatedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporatedashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
