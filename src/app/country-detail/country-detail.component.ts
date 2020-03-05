import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryInfoService } from '../country-info.service';
import { Country } from '../country-info-interface';


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  allCountry: Country[];
	statusCode: number;
	requestProcessing = false;
	countryIdToUpdate = null;
	processValidation = false;

  countryForm = new FormGroup({
		country: new FormControl('', Validators.required),
		state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)
	});
  constructor(private countryService: CountryInfoService) { }

  ngOnInit(): void {
    this.getAllCountry();
  }
  getAllCountry() {
		this.countryService.getAllCountry()
			.subscribe(
				data => this.allCountry = data,
				errorCode => this.statusCode = errorCode);
	}
  onCountryFormSubmit() {
		this.processValidation = true;
		if (this.countryForm.invalid) {
			return;
		}

		this.preProcessConfigurations();
		let country = this.countryForm.value;
		if (this.countryIdToUpdate === null) {
			this.countryService.getAllCountry()
				.subscribe(countrys => {

					let maxIndex = countrys.length - 1;
					let countryWithMaxIndex = countrys[maxIndex];
					let countryId = countryWithMaxIndex.id + 1;
					country.id = countryId;


					this.countryService.createCountry(country)
						.subscribe(statusCode => {
							//Expecting success code 201 from server
							this.statusCode = statusCode;
							this.getAllCountry();
							this.backToCreateCountry();
						},
							errorCode => this.statusCode = errorCode
						);
				});
		} else {


			country.id = this.countryIdToUpdate;
			this.countryService.updateCountry(country)
				.subscribe(statusCode => {
					//this.statusCode = statusCode;
					//Expecting success code 204 from server
					this.statusCode = 200;
					this.getAllCountry();
					this.backToCreateCountry();
				},
					errorCode => this.statusCode = errorCode);
		}
	}
  loadCountryToEdit(countryId: string) {
		this.preProcessConfigurations();
		this.countryService.getCountryById(countryId)
			.subscribe(country => {
				this.countryIdToUpdate = country.id;
				this.countryForm.setValue({ country: country.country, state: country.state,city:country.city });
				this.processValidation = true;
				this.requestProcessing = false;
			},
				errorCode => this.statusCode = errorCode);
	}
  deleteCountry(countryId: string) {
		this.preProcessConfigurations();
		this.countryService.deleteCountryById(countryId)
			.subscribe(successCode => {
				//this.statusCode = successCode;
				//Expecting success code 204 from server
				this.statusCode = 204;
				this.getAllCountry();
				this.backToCreateCountry();
			},
				errorCode => this.statusCode = errorCode);
	}
  preProcessConfigurations() {
		this.statusCode = null;
		this.requestProcessing = true;
	}
  backToCreateCountry() {
		this.countryIdToUpdate = null;
		this.countryForm.reset();
		this.processValidation = false;
	}
}
