import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { Router } from '@angular/router';

declare let openPlatformModalMessage: any;

@Component({
  selector: 'app-country-creator',
  templateUrl: './country-creator.component.html',
  styleUrls: ['./country-creator.component.css']
})
export class CountryCreatorComponent implements OnInit {

  frmValidator: FormGroup;

  constructor(private fb: FormBuilder, private countryService: CountryService, private router: Router) { }

  ngOnInit() {
    this.formGenerator();
  }

  get fv() {
    return this.frmValidator.controls;
  }

  formGenerator() {
    this.frmValidator = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  saveCountry() {
    if (this.frmValidator.invalid) {
      openPlatformModalMessage("the form is invalid!")
    } else {
      let saved = this.countryService.saveNewCountry(this.fv.code.value, this.fv.name.value);
      if (saved == 1) {
        openPlatformModalMessage("Data stored successfully.");
        this.router.navigate(['/country/list']);
      } else {
        if (saved == 2) {
          openPlatformModalMessage("The country with this code already exists.");
        } else {
          openPlatformModalMessage("Error storing data.");
        }
      }
    }
  }

}
