import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

declare var openConfirmationModal: any;

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  p: number = 1;
  hotelList: HotelModel[] = [];
  codeToRemove: String;

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels = () => {
    this.hotelList = this.hotelService.loadAllHotels();
  }

  openConfirmation(code){
    this.codeToRemove = code;
    openConfirmationModal();
  }

  removeElement(){
    this.hotelService.deleteHotel(this.codeToRemove);
    this.loadHotels();
  }

}