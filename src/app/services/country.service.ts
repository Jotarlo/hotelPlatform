import { Injectable } from '@angular/core';
import { CountryModel } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  loadAllCountries() {
    let tb_country = JSON.parse(localStorage.getItem("tb_country"));
    return tb_country;
  }

  saveNewCountry(country: CountryModel) {
    try {
      let currentRecords = this.loadAllCountries();
      let exists = currentRecords.filter(x => x.code == country.code).length > 0;
      if (!exists) {
        currentRecords.push(country);
        this.saveListInLocalStorage(currentRecords);
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      return 3;
    }
  }

  searchCountry(code: String) {
    let countries = this.loadAllCountries();
    let country = countries.find(c => c.code == code);
    return country;
  }

  updateCountry(country: CountryModel) {
    try {
      let countries = this.loadAllCountries();
      let exists = countries.filter(x => x.code == country.code).length == 0;
      if (!exists) {
        countries.forEach(c => {
          if (c.code == country.code) {
            c.name = country.name;
          }
        });
        this.saveListInLocalStorage(countries);
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      return 3;
    }
  }

  saveListInLocalStorage(list) {
    localStorage.setItem("tb_country", JSON.stringify(list));
  }

  deleteCountry(code: String){
    let countries = this.loadAllCountries();
    let index = -1;
    countries.forEach((c, i) => {
      if(c.code == code){
        index = i;
      }
    });
    //console.log(index);
    countries.splice(index, 1);
    this.saveListInLocalStorage(countries);
  }

}
