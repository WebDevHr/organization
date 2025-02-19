export interface CreateCorporateRequest {
    storeName: string;
    taxNumber: string;
    eventTypes: string[]; // veya Guid[]
    serviceTypes: string[]; // veya Guid[]
    corporateTitle: string;
    taxOffice: string;
    supportEmail: string;
    telephone: string;
    telephone2: string;
    webAddress: string;
    maxCustomerCapacity: number;
    //picture: File | null;
    address: string;
  }