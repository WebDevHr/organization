import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CorporateService } from '../../services/corporate.service';
import { CreateCorporateRequest } from '../../models/create-corporate-request.model';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import { EventTypeService } from '../../services/event-type.service';
import { ServiceService } from '../../services/service.service';
import { EventType } from '../../models/event-type.model';
import { ServiceModel } from '../../models/service.model';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-corporate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,ToggleSwitchModule,StepperModule,ButtonModule,ToggleButtonModule],
  templateUrl: './create-corporate.component.html',
  styleUrl: './create-corporate.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Web bileşenlerini tanımak için
  
})
export class CreateCorporateComponent {
  checked: boolean = false;
  registrationFormStep1!: FormGroup;
  registrationFormStep2!: FormGroup;
  eventTypes: EventType[] = [];
  services!: ServiceModel[];
  error: string = '';

  selectedEventTypes2: { [key: string]: boolean } = {};
  selectedServices: { [key: string]: boolean } = {};

  isBackendValidated: boolean = false; // Backend doğrulama sonucu
  isButtonDisabled: boolean = true; // Butonun başlangıçta pasif olması

  activeStepIndex: number = 1; // İlk step'in aktif olması


  constructor(private fb:FormBuilder,
              private http:HttpClient,
              private corporateService:CorporateService,
              private eventTypeService:EventTypeService,
              private serviceService:ServiceService,
              private notificationService: NotificationService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadEventTypes();
    this.loadServices();
    this.registrationFormStep1 = this.fb.group({
      storeName: ['', Validators.required],
      taxNumber: ['', Validators.required],
    });

    this.registrationFormStep2 = this.fb.group({
      corporateTitle: [''],
      taxOffice: [''],
      supportEmail: [''],
      telephone: [''],
      telephone2: [''],
      webAddress: [''],
      maxCustomerCapacity: [null],
      //picture: [null, Validators.required],
      address: [''],
    });

    this.eventTypes.forEach((event) => {
      this.selectedEventTypes2[event.id] = false; 
    });

    this.services.forEach((event) => {
      this.selectedServices[event.id] = false; 
    });
   
  }


  
  onSubmit(): void {
      const formData: CreateCorporateRequest = {
        storeName: this.registrationFormStep1.value.storeName,
        taxNumber: this.registrationFormStep1.value.taxNumber,
        eventTypes: [], 
        serviceTypes: [], 
        corporateTitle: this.registrationFormStep2.value.corporateTitle,
        taxOffice: this.registrationFormStep2.value.taxOffice,
        supportEmail: this.registrationFormStep2.value.supportEmail,
        telephone: this.registrationFormStep2.value.telephone,
        telephone2: this.registrationFormStep2.value.telephone2,
        webAddress: this.registrationFormStep2.value.webAddress,
        maxCustomerCapacity: this.registrationFormStep2.value.maxCustomerCapacity,
        //picture: this.registrationForm.value.picture,
        address: this.registrationFormStep2.value.address,
      };

      this.eventTypes.forEach((event) => {
        if(this.selectedEventTypes2[event.id] == true){
          formData.eventTypes.push(event.id);
        };
     });
  
     this.services.forEach((serv) => {
      if(this.selectedServices[serv.id] == true){
        formData.serviceTypes.push(serv.id);
      };
   });

      this.corporateService.createCorporate(formData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Corporate registration successful');
          this.router.navigate(['corporate-dashboard']);
        },
        error: (error) => {
          console.error('Error occurred during registration:', error);
          this.notificationService.showError(error);
        },
      });

  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.registrationFormStep1.patchValue({ picture: file });
  }


  chekedEventTye(eventTypeId: string): boolean {
    return true;
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

  private loadServices() {
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

  isStoreNameEntered(): boolean { 
    let result: boolean = true;

    if(this.registrationFormStep1.get('storeName')?.hasError('required') && this.registrationFormStep1.get('storeName')?.touched)
      result = false;

    return result
  }

  isTaxNumberEntered(): boolean {
    let result: boolean = true;

    if(this.registrationFormStep1.get('taxNumber')?.hasError('required') && this.registrationFormStep1.get('taxNumber')?.touched)
      result = false;
    
    return result
  }

  // checkButtonDisabled(): boolean {
  //   let result: boolean = true;

  //   if(!this.checkStoreName() && !this.checkTaxNumber())
  //   this.corporateService.checkCorporateExists(this.registrationForm.value.storeName, this.registrationForm.value.taxNumber).subscribe({
  //     next: (response) => {
  //       if (response.isSuccess) {
  //         result = response.data;  
  //       } else {
  //         this.notificationService.showError(response.status, response.errorMessage);
  //       }
  //     }
  //   });

  //   return result
  // }

  saveFirstStep() {
    if (this.registrationFormStep1.invalid) {
      // Tüm hataları göstermek için formu "touched" yap
      this.registrationFormStep1.markAllAsTouched();
      return;
    }

    if(this.registrationFormStep1.valid){
      this.activeStepIndex=2 ; 
    }

    return;

  //  this.corporateService.checkCorporateExists(this.registrationForm.value.storeName, this.registrationForm.value.taxNumber).subscribe({
  //   next: (response) => {
  //     if (response.isSuccess) {
  //      if(response.data ==true)
  //      {
  //       this.notificationService.showError(400, "Bu mazağaza adı ve vergi numarası ile kayıtlı bir kurumsal müşteri zaten var");
  //       return;
  //      }
  //      else{
  //       this.activeStepIndex=2 ; 
  //      }
  //     } else {
  //       this.notificationService.showError(response.status, response.errorMessage);
  //     }},
  //     error: (error) => {
  //      this.isBackendValidated = false; // Hata durumunda backend doğrulaması başarısız
       
  //     }
  //    });
   
     
   
  }

  saveSecondStep() {
    this.activeStepIndex=3 ;
  }

  saveThirdStep() {
    this.activeStepIndex=4 ;
  }

}
