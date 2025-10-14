import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  saveBooking(bookingData: any) {
    console.log('Booking data received:', bookingData);

    // Mock saving to localStorage
    localStorage.setItem('booking', JSON.stringify(bookingData));

    return true; // Simulate successful booking
  }
}