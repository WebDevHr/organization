import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventWizardComponent } from './search-event-wizard.component';

describe('SearchEventWizardComponent', () => {
  let component: SearchEventWizardComponent;
  let fixture: ComponentFixture<SearchEventWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEventWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
