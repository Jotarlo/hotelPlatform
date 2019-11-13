import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryModel } from 'src/app/models/country.model';
import { HotelService } from 'src/app/services/hotel.service';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { HotelModel } from 'src/app/models/hotel.model';
import { CityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';

declare var openPlatformModalMessage:any;
declare var initMaterializeSelect: any;

@Component({
  selector: 'app-hotel-creator',
  templateUrl: './hotel-creator.component.html',
  styleUrls: ['./hotel-creator.component.css']
})
export class HotelCreatorComponent implements OnInit {
  countryList: CountryModel[] = [];
  cityList: CityModel[] = [];
  frmValidator: FormGroup;

  constructor(private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private cityService: CityService,
    private countryService: CountryService) { }

  ngOnInit() {
    this.formGenerator();
    this.countryList = this.countryService.loadAllCountries();
  }

  ngAfterViewInit(){
    initMaterializeSelect()
  }

  get fv() {
    return this.frmValidator.controls;
  }

  formGenerator() {
    this.frmValidator = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      category: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      image: ['', [Validators.required]],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required]
    });
  }

  saveHotel() {
    console.log(this.fv);
    if (this.frmValidator.invalid) {
      openPlatformModalMessage("the form is invalid!")
    } else {
      let c: HotelModel = {
        code: this.fv.code.value,
        name: this.fv.name.value,
        address: this.fv.address.value,
        phone: this.fv.phone.value,
        category: this.fv.category.value,
        email: this.fv.email.value,
        image: this.fv.image.value,
        cityId: this.fv.cityId.value
      }

      let saved = this.hotelService.saveNewHotel(c);
      console.log(saved);
      if (saved == 1) {
        openPlatformModalMessage("Data stored successfully.");
        this.router.navigate(['/hotel/list']);
      } else {
        if (saved == 2) {
          openPlatformModalMessage("The hotel with this code already exists.");
        } else {
          openPlatformModalMessage("Error storing data.");
        }
      }
    }
  }

  LoadCitiesOfCountry(){
    let country = this.fv.countryId.value;
    this.cityList = this.cityService.loadAllCitiesByCountry(country);
    
    setTimeout(() => {
      initMaterializeSelect();
    }, 100); 
  }

}
