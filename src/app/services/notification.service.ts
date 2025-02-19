import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
  }

  showInfo(message: string, title: string = 'Success') {
    this.toastr.info(message, title);
  }

  showError(error: any) {
    if (error.status === 400) {
      this.toastr.warning(error.errorMessage || 'Invalid input.', 'Warning');
    } else if (error.status === 500) {
      this.toastr.error(error.errorMessage || 'Server error. Please try again later.', 'Error');
    } else {
      this.toastr.error(error.errorMessage, 'Error');
    }
  }
}
