import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { Router } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';

declare var openPlatformModalMessage: any;
declare var initMaterializeSelect: any;

@Component({
  selector: 'app-city-creator',
  templateUrl: './city-creator.component.html',
  styleUrls: ['./city-creator.component.css']
})
export class CityCreatorComponent implements OnInit {
  countryList: CountryModel[] = [];
  frmValidator: FormGroup;

  constructor(private fb: FormBuilder,
    private cityService: CityService,
    private router: Router,
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
      countryId: ['', Validators.required]
    });
  }

  saveCity() {
    console.log(this.fv);
    if (this.frmValidator.invalid) {
      openPlatformModalMessage("the form is invalid!")
    } else {
      let c: CityModel = {
        code: this.fv.code.value,
        name: this.fv.name.value,
        countryId: this.fv.countryId.value
      }
      let saved = this.cityService.saveNewCity(c);
      console.log(saved);
      if (saved == 1) {
        openPlatformModalMessage("Data stored successfully.");
        this.router.navigate(['/city/list']);
      } else {
        if (saved == 2) {
          openPlatformModalMessage("The city with this code already exists.");
        } else {
          openPlatformModalMessage("Error storing data.");
        }
      }
    }
  }


}
