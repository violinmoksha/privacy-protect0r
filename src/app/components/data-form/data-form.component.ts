import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PIValues } from '../../models/pivalues';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {
  public grp: FormGroup;
  public vals: PIValues;
  public valsAsArr: any;
  public keysAsArr: any;
  public optionSelection: any = [''];
  public optionsAsCats: any = {
    'HR/PII': ["First Name", "Middle Name", "Last Name", "EMail", "Phone", "Zipcode", "Code of the Day", "Social Media Profile URL", "Social Security Number", "Driver's License", "Passport Number", "Passport Nation", "Age", "Other Names Used in the Past"],
    'Health/PHI': ["Medical Diagnosis", "Medical Prescription", "Blood Group", "Government Food Subsistence"],
    'FinTech/PCI': ["Non PCI-Protected Account ID", "Non PCI-Protected Security Code"]
  };
  public catSelection: any = [''];
  public hiddenRows: any = [true];
  public filteredValues: any = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.vals = new PIValues();
    this.grp = new FormGroup({});
    this.valsAsArr = [];
    this.keysAsArr = [];

    let ct = 0;
    Object.keys(this.vals).forEach(key => {
      this.grp[key] = new FormControl('', Validators.required);
      this.grp[key].valueChanges.subscribe(newValue => {
        this.filteredValues = this.filterValues(newValue);
      });
      this.valsAsArr.push(Object.values(this.vals)[ct++]);
      this.keysAsArr.push(key);
    })

    //console.log(this.valsAsArr);
    //console.log(Object.values(this.vals));
  }

  ngOnInit() {
  }

  exposeFieldValueInput(option: string, ix: number) {
    this.optionSelection[ix] = option;
    if (this.optionsAsCats['HR/PII'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: HR/PII';
    } else if (this.optionsAsCats['Health/PHI'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: Health/PHI';
    } else if (this.optionsAsCats['FinTech/PCI'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: FinTech/PCI';
    }
    //this.cdr.detectChanges();
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent, index: number) {
    this.exposeFieldValueInput(event.option.value, index);
    console.log(this.optionSelection);
  }

  showMoreRows(ix) {
    console.log(this.hiddenRows);
    this.hiddenRows[ix+1] = true;
  }

  filterValues(search: string) {
    return this.valsAsArr.filter( value =>
      value.toLowerCase().indexOf(search.toLowerCase()) === 0);
  }

  onSubmit() {
    this.router.navigateByUrl('/menu-form');
  }
}
