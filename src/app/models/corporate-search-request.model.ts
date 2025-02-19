export enum EventMode {
    PersonalEvent = 1,
    CorporateEVent =2
}

export enum AlcoholUse{
    NoAlcohol=1,
    AlcoholFree =2,
    NoMatter=3
}

export interface SearchCorporateForEventRequest {
    eventMode: EventMode;
    eventTypeId: string; // Guid
    eventDate: string; // Date olarak gönderileceği için string
    numberOfGuests: number;
    alcoholUse: AlcoholUse;
    services?: string[]; // Guid listesi
  }