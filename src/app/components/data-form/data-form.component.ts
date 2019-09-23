import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {
  public myControl: FormControl;
  public options: string[] = [
    "First Name",
    "Middle Name",
    "Last Name",
    "EMail",
    "Phone",
    "Zipcode",
    "Code of the Day",
    "Social Media Profile URL",
    "Social Security Number",
    "Driver's License",
    "Passport Number",
    "Passport Nation",
    "Age",
    "Other Names Used in the Past", // pii
    "Medical Diagnosis",
    "Medical Prescription",
    "Blood Group",
    "Government Food Subsistence", // phi
    "Non PCI-Protected Account ID",
    "Non PCI-Protected Security Code"
  ];
  public secondRowShown: boolean = false;
  public thirdRowShown: boolean = false;
  public fourthRowShown: boolean = false;

  public optionSelection: string;

  public firstValueExposed: boolean = false;

  constructor() {
    this.myControl = new FormControl();
  }

  ngOnInit() {
  }

  exposeFieldValueInput(opt: any) {
    // TODO: sub-function for all field patterns f.e. phone as +1 (123) 456-7890 etc.
    if (!this.firstValueExposed) {
      this.firstValueExposed = true;
      this.optionSelection = opt;
    }
  }

  showMoreRows() { // ridiculous straw-house recursion h3h
    if (!this.secondRowShown) {
      this.secondRowShown = true;
    } else {
      if (!this.thirdRowShown) {
        this.thirdRowShown = true;
      } else {
        if (!this.fourthRowShown) {
          this.fourthRowShown = true;
        }
      }
    }
  }
}
