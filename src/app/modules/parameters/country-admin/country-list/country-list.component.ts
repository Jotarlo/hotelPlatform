import { Component, OnInit } from '@angular/core';
import { CountryModel } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  p: number = 1;
  countryList: CountryModel[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries = () => {
    this.countryList = this.countryService.loadAllCountries();
  }

}
