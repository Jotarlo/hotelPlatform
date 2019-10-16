import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  loadAllCountries() {
    let tb_country = JSON.parse(localStorage.getItem("tb_country"));
    return tb_country;
  }

  saveNewCountry(code: String, name: String) {
    try {
      let currentRecords = this.loadAllCountries();
      let exists = currentRecords.filter(x => x.code == code).length > 0;
      if (!exists) {
        currentRecords.push({ code: code, name: name });
        localStorage.setItem("tb_country", JSON.stringify(currentRecords));
        return 1;
      }else{
        return 2;
      }
    } catch (error) {
      return 3;
    }
  }

}
