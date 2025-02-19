import { Component } from '@angular/core';
import { StepperModule} from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { EventTypeService } from '../../services/event-type.service';
import { EventType } from '../../models/event-type.model';
import { DatePickerModule} from 'primeng/datepicker';
import { FormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import { ServiceModel } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';
import {Select} from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { PanelModule} from 'primeng/panel';
import { CorporateService } from '../../services/corporate.service';
import { SearchCorporateForEventRequest } from '../../models/corporate-search-request.model';
import { generic_response } from '../../models/generic-response.model';
import { corporate } from '../../models/corporate.model';
import { NotificationService } from '../../services/notification.service';

 interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-search-event-wizard',
  imports: [ButtonModule,StepperModule,DatePickerModule,FormsModule,CommonModule,MultiSelectModule,Select,RadioButton,PanelModule],
  standalone: true,
  templateUrl: './search-event-wizard.component.html',
  styleUrl: './search-event-wizard.component.css'
})
export class SearchEventWizardComponent {
  eventModes = [{id: 1 , name :'Kişisel Etkinlik'},{id: 2 , name: 'Kurumsal Etkinlik'}];

  selectedEventMode: any | null =null;
  selectedEventType: any | null = null;
  eventTypes: EventType[] = [];
  error: string = '';
  selectedDate : Date | null = null;

  personOptions: string[] = []; // Dropdown seçeneklerini tutar
  selectedPeopleCount: number | null = null; // Seçilen değer

  cities!: City[];
  selectedCities!: City[];

  services: ServiceModel[] = [];
  selectedServices!: ServiceModel[];
  
  alcoholFree: number = 3;

  corporates: corporate[] = [];

  constructor(private eventTypeService:EventTypeService
    ,private serviceService:ServiceService
    ,private corporateService:CorporateService,
  private notificationService:NotificationService) {
  
   
  }

  generatePersonOptions(): void {
    for (let i = 1; i <= 100; i += 5) {
      const end = i + 4 <= 100 ? i + 4 : 100;
      this.personOptions.push(`${i}-${end}`);
    }
  }

  ngOnInit() { 
    this.loadEventTypes();
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  this.generatePersonOptions();    
  this.selectedEventMode=0;
  this.getServices();
  }
  
  onSelectEventType() {
    console.log('Selected Event Type:', this.selectedEventType); 
    console.log("Selected Services:",this.selectedServices);
  }

  private loadEventTypes() {
    this.eventTypeService.getEventTypes().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.eventTypes = response.data;
        } else {
          this.error = response.errorMessage || 'Failed to load event types';
        }
      },
      error: (error) => {
        this.error = 'Error loading event types';
        console.error('Error:', error);
      }
    });
  }

  private getServices() {
    this.serviceService.getServices().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.services = response.data;
          console.log("Services:",this.services);
        } else {
          this.error = response.errorMessage || 'Failed to load services';
        }
      },
      error: (error) => {
        this.error = 'Error loading services';
        console.error('Error:', error);
      }
    });
  }

  searchCorporate() {
    const request: SearchCorporateForEventRequest = {
      eventMode : this.selectedEventMode.id, 
      eventTypeId : this.selectedEventType.id,
      eventDate : this.selectedDate ? this.selectedDate.toISOString() : '',
      numberOfGuests: this.selectedPeopleCount ?? 0,
      alcoholUse: this.alcoholFree,
      services: this.selectedServices.map(service => service.id)
    }

    console.log("Search Request",request);

    this.corporateService.searchCorporateForEvent(request).subscribe({
      next: (response: generic_response<corporate[]>) => {
        console.log("Search Corporate Response",response);
        this.corporates = response.data;
        console.log(this.corporates);
      },
      error: (error) => {
        const errorMessage = error.error?.ErrorMessage || 'An unexpected error occurred.';
        this.notificationService.showError(error);
      }
    })
  }
}
