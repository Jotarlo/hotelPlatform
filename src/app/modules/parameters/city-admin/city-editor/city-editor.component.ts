import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';

declare var openPlatformModalMessage: any;
declare var initMaterializeSelect:any;
@Component({
  selector: 'app-city-editor',
  templateUrl: './city-editor.component.html',
  styleUrls: ['./city-editor.component.css']
})
export class CityEditorComponent implements OnInit {

  countryList: CountryModel[] = [];
  frmValidator: FormGroup;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private countryService: CountryService,
    private router: Router,
    private cityService: CityService) {

  }

  ngOnInit() {
    this.countryList = this.countryService.loadAllCountries();
    this.formGenerator();
    this.getCityInfo();
  }

  ngAfterViewInit(){
    initMaterializeSelect()
  }

  getCityInfo() {
    let code = this.route.snapshot.paramMap.get("id");
    if (code != undefined && code != null) {
      let city = this.cityService.searchCity(code);
      if (city != undefined && city != null) {
        console.log(city);
        this.fv.code.setValue(city.code);
        this.fv.name.setValue(city.name);
        this.fv.countryId.setValue(city.countryId);
      } else {
        openPlatformModalMessage(`The city with code ${code} does not exists!`);
        this.router.navigate(["/city/list"]);
      }
    } else {
      openPlatformModalMessage("The URL is invalid!");
    }
    //this.code = this.route.snapshot.params["id"];
    //console.log(this.code);
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
    if (this.frmValidator.invalid) {
      openPlatformModalMessage("the form is invalid!")
    } else {
      let c: CityModel = {
        code: this.fv.code.value,
        name: this.fv.name.value,
        countryId: this.fv.countryId.value
      }
      console.log("City object");
      console.warn(c);
      let saved = this.cityService.updateCity(c);
      if (saved == 1) {
        openPlatformModalMessage("Data stored successfully.");
        this.router.navigate(['/city/list']);
      } else {
        if (saved == 2) {
          openPlatformModalMessage("The city with this code does not exists.");
        } else {
          openPlatformModalMessage("Error storing data.");
        }
      }
    }
  }


}
