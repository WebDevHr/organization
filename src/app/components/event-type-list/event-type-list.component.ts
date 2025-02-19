import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTypeService } from '../../services/event-type.service';
import { EventType } from '../../models/event-type.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-event-type-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-type-list.component.html',
  styleUrl: './event-type-list.component.css'
    
})
export class EventTypeListComponent implements OnInit {
  eventTypes: EventType[] = [];
  error: string = '';

  constructor(private eventTypeService: EventTypeService) {}

  ngOnInit() {
    this.loadEventTypes();
  }

  private loadEventTypes() {
    this.eventTypeService.getEventTypes().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log(response.data);
          this.eventTypes = response.data;
          console.log("Event Types",this.eventTypes);
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
}