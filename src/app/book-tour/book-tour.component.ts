import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service'; // ✅ Import BookingService

@Component({
  selector: 'app-book-tour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookTourComponent implements OnInit {
  bookingForm!: FormGroup;
  destinations: any[] = [];
  bookingsList: any[] = [];
  selectedDestination: any = null;
  totalPrice = 0;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private bookingService: BookingService // ✅ Inject BookingService
  ) {}

  ngOnInit(): void {
    // ✅ Initialize form
    this.bookingForm = this.fb.group({
      destination: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      travelDate: ['', Validators.required],
      travelers: [1, [Validators.required, Validators.min(1)]],
      requests: ['']
    });

    // ✅ Load destinations
    this.destinations = [
      { name: 'Maharashtra', price: 12500, image: 'assets/images/destinations/maharashtra.jpg', location: 'Maharashtra' },
      { name: 'Uttarakhand', price: 9800, image: 'assets/images/destinations/uttarakhand.jpg', location: 'Uttarakhand' },
      { name: 'Tamil Nadu', price: 13500, image: 'assets/images/destinations/tamilnadu.jpg', location: 'Tamil Nadu' },
      { name: 'Kashmir', price: 14000, image: 'assets/images/destinations/kashmir.jpg', location: 'Jammu & Kashmir' },
      { name: 'Arunachal Pradesh', price: 11200, image: 'assets/images/destinations/arunachalpradesh.jpg', location: 'Arunachal Pradesh' },
      { name: 'Rajasthan', price: 13800, image: 'assets/images/destinations/rajasthan.jpg', location: 'Rajasthan' },
      { name: 'West Bengal', price: 9500, image: 'assets/images/destinations/westbengal.jpg', location: 'West Bengal' },
      { name: 'Meghalaya', price: 10500, image: 'assets/images/destinations/meghalaya.jpg', location: 'Meghalaya' },
      { name: 'Assam', price: 8800, image: 'assets/images/destinations/assam.jpg', location: 'Assam' },
      { name: 'Gujarat', price: 12300, image: 'assets/images/destinations/gujarat.jpg', location: 'Gujarat' },
      { name: 'Himachal Pradesh', price: 10900, image: 'assets/images/destinations/himachalpradesh.jpg', location: 'Himachal Pradesh' },
      { name: 'Sikkim', price: 9900, image: 'assets/images/destinations/sikkim.jpg', location: 'Sikkim' },
      { name: 'Andhra Pradesh', price: 11400, image: 'assets/images/destinations/andhrapradesh.jpg', location: 'Andhra Pradesh' },
      { name: 'Madhya Pradesh', price: 13000, image: 'assets/images/destinations/madhyapradesh.jpg', location: 'Madhya Pradesh' },
      { name: 'Karnataka', price: 12700, image: 'assets/images/destinations/karnataka.jpg', location: 'Karnataka' },
      { name: 'Uttar Pradesh', price: 14500, image: 'assets/images/destinations/uttarpradesh.jpg', location: 'Uttar Pradesh' },
      { name: 'Goa', price: 9200, image: 'assets/images/destinations/goa.jpg', location: 'Goa' },
      { name: 'Odisha', price: 10600, image: 'assets/images/destinations/odisha.jpg', location: 'Odisha' },
      { name: 'Kerala', price: 11800, image: 'assets/images/destinations/kerala.jpg', location: 'Kerala' },
      { name: 'Punjab', price: 10200, image: 'assets/images/destinations/punjab.jpg', location: 'Punjab' },
      { name: 'Nagaland', price: 11000, image: 'assets/images/destinations/nagaland.jpg', location: 'Nagaland' },
      { name: 'Manipur', price: 10500, image: 'assets/images/destinations/manipur.jpg', location: 'Manipur' },
      { name: 'Pondicherry', price: 9800, image: 'assets/images/destinations/pondicherry.jpg', location: 'Pondicherry' },
      { name: 'Lakshadweep Islands', price: 16000, image: 'assets/images/destinations/lakshadweep.jpg', location: 'Lakshadweep' },
      { name: 'Andaman and Nicobar Islands', price: 19000, image: 'assets/images/destinations/andaman.jpg', location: 'Andaman & Nicobar Islands' },
      { name: 'Mizoram', price: 10800, image: 'assets/images/destinations/mizoram.jpg', location: 'Mizoram' }
    ];

    // ✅ Load saved bookings
    const stored = localStorage.getItem('bookings');
    if (stored) {
      this.bookingsList = JSON.parse(stored);
    }

    // ✅ Watch for destination & traveler changes
    this.bookingForm.get('destination')?.valueChanges.subscribe(value => this.onDestinationSelect(value));
    this.bookingForm.get('travelers')?.valueChanges.subscribe(() => this.updateTotalPrice());
  }

  // 🌍 Destination selection
  onDestinationSelect(destinationName: string) {
    this.selectedDestination = this.destinations.find(d => d.name === destinationName);
    this.updateTotalPrice();
  }

  // 💰 Price calculation
  updateTotalPrice() {
    if (this.selectedDestination) {
      const count = this.bookingForm.get('travelers')?.value || 1;
      this.totalPrice = this.selectedDestination.price * count;
    }
  }

  // ✅ Form submission using service
  onSubmit(event: Event) {
    event.preventDefault();

    if (this.bookingForm.valid && this.selectedDestination) {
      const bookingData = {
        ...this.bookingForm.value,
        destinationDetails: this.selectedDestination,
        totalPrice: this.totalPrice
      };

      // 💾 Save booking via service
      const success = this.bookingService.saveBooking(bookingData);

      if (success) {
        this.toastr.success('Your booking has been saved successfully!', 'Booking Confirmed 🎉');
      }

      // Reset form
      this.bookingForm.reset({ travelers: 1 });
      this.selectedDestination = null;
      this.totalPrice = 0;
    } else {
      this.toastr.error('Please fill all required fields correctly.', 'Booking Failed ⚠️');
    }
  }
}