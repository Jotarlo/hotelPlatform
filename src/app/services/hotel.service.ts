import { Injectable } from '@angular/core';
import { HotelModel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor() { }

  loadAllHotels() {
    let tb_hotel = JSON.parse(localStorage.getItem("tb_hotel"));
    if (tb_hotel != undefined && tb_hotel != null) {
      return tb_hotel;
    } else {
      return []
    }
  }

  saveNewHotel(hotel: HotelModel) {
    try {
      let currentRecords = this.loadAllHotels();
      let exists = currentRecords.filter(x => x.code == hotel.code).length > 0;
      if (!exists) {
        currentRecords.push(hotel);
        this.saveListInLocalStorage(currentRecords);
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.error(error);
      return 3;
    }
  }

  searchHotel(code: String) {
    let hotels = this.loadAllHotels();
    let hotel = hotels.find(c => c.code == code);
    return hotel;
  }

  updateHotel(hotel: HotelModel) {
    try {
      let hotels = this.loadAllHotels();
      let exists = hotels.filter(x => x.code == hotel.code).length == 0;
      if (!exists) {
        hotels.forEach(c => {
          if (c.code == hotel.code) {
            c.name = hotel.name;
            c.cityId = hotel.cityId;
            c.category = hotel.category;
            c.address = hotel.address;
            c.phone = hotel.phone;
            c.email = hotel.email;
            c.image = hotel.image;
          }
        });
        this.saveListInLocalStorage(hotels);
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      return 3;
    }
  }

  saveListInLocalStorage(list) {
    localStorage.setItem("tb_hotel", JSON.stringify(list));
  }

  deleteHotel(code: String) {
    let hotels = this.loadAllHotels();
    let index = -1;
    hotels.forEach((c, i) => {
      if (c.code == code) {
        index = i;
      }
    });
    //console.log(index);
    hotels.splice(index, 1);
    this.saveListInLocalStorage(hotels);
  }
}
