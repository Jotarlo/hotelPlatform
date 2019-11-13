import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  loadAllCities() {
    let tb_city = JSON.parse(localStorage.getItem("tb_city"));
    if (tb_city != undefined && tb_city != null) {
      return tb_city;
    } else {
      return []
    }
  }

  loadAllCitiesByCountry(country) {
    let tb_city = JSON.parse(localStorage.getItem("tb_city"));
    if (tb_city != undefined && tb_city != null) {
      return tb_city.filter(c => c.countryId == country);
    } else {
      return []
    }
  }

  saveNewCity(city: CityModel) {
    try {
      let currentRecords = this.loadAllCities();
      let exists = currentRecords.filter(x => x.code == city.code).length > 0;
      if (!exists) {
        currentRecords.push(city);
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

  searchCity(code: String) {
    let cities = this.loadAllCities();
    let city = cities.find(c => c.code == code);
    return city;
  }

  updateCity(city: CityModel) {
    try {
      let cities = this.loadAllCities();
      let exists = cities.filter(x => x.code == city.code).length == 0;
      if (!exists) {
        cities.forEach(c => {
          if (c.code == city.code) {
            c.name = city.name;
            c.countryId = city.countryId;
          }
        });
        this.saveListInLocalStorage(cities);
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      return 3;
    }
  }

  saveListInLocalStorage(list) {
    localStorage.setItem("tb_city", JSON.stringify(list));
  }

  deleteCity(code: String) {
    let cities = this.loadAllCities();
    let index = -1;
    cities.forEach((c, i) => {
      if (c.code == code) {
        index = i;
      }
    });
    //console.log(index);
    cities.splice(index, 1);
    this.saveListInLocalStorage(cities);
  }
}
