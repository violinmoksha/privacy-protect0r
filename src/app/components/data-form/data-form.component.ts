import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PIValues } from '../../models/pivalues';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FRBBizAttributionComponent } from './FRBBizAttributeComponent-snack';

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
  public formMissesValues: boolean = false;
  public reqDetailsIsCollapsed: boolean = true;
  public reqActivityIsCollapsed: boolean = true;
  public maskVals: any = {
    "First Name":"Joe",
    "Middle Name":"Albert",
    "Last Name":"Smith",
    "EMail":"joesmith@somewhere.com",
    "Phone":"(415)-555-1234",
    "Zipcode":"94930",
    "Code of the Day":"1234",
    "Social Media Profile URL":"https://facebook.com/joesmith",
    "Social Security Number":"xxx-xx-1234",
    "Driver's License":"D9876123",
    "Passport Number": "345423234",
    "Passport Nation": "USA",
    "Age": "38",
    "Other Names Used in the Past": "NA",
    "Medical Diagnosis": "Active Worker",
    "Medical Prescription": "CoQ10, Vitamin C",
    "Blood Group": "O-Positive",
    "Government Food Subsistence": "false",
    "Non PCI-Protected Account ID": "123456",
    "Non PCI-Protected Security Code": "987"
  };
  public maskedPhone: string = '';
  public spinnerShown = false;
  public alertHide = false;
  public phoneMaskEnable: boolean = false;
  public ssnMaskEnable: boolean = false;

  @Input('phone_value') phoneInput: HTMLInputElement;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private elementRef:ElementRef, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.vals = new PIValues();
    this.grp = new FormGroup({});
    this.valsAsArr = [];
    this.keysAsArr = [];

    let ct = 0;
    Object.keys(this.vals).forEach(key => {
      this.grp[key] = new FormControl('', [Validators.required]);
      this.grp[key].valueChanges.subscribe(newValue => {
        this.filteredValues = this.filterValues(newValue);
      });
      this.valsAsArr.push(Object.values(this.vals)[ct++]);
      this.keysAsArr.push(key);

      // and make the oft pattern-validated value formControl
      if (key == 'first_name' || key == 'middle_name' || key == 'last_name') {
        this.grp[key+'_value'] = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z']+$")]);
      } else if (key == 'email') {
        this.grp[key+'_value'] = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);
      } else if (key == 'phone') {
        this.grp[key+'_value'] = new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(14)]);
      }


    })

    //console.log(this.valsAsArr);
    //console.log(Object.values(this.vals));
  }

  ngOnInit() {
  }

  exposeFieldValueInput(option: string, ix: number) {
    let ct = 0;
    Object.keys(this.maskVals).forEach(key => {
      if (option == key) {
        this.optionSelection[ix] = Object.values(this.maskVals)[ct];
      }
      ct++;
    });
    //this.optionSelection[ix] = option;

    if (this.optionsAsCats['HR/PII'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: HR/PII';
    } else if (this.optionsAsCats['Health/PHI'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: Health/PHI';
    } else if (this.optionsAsCats['FinTech/PCI'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: FinTech/PCI';
    }
    this.cdr.detectChanges();
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent, index: number) {
    this.exposeFieldValueInput(event.option.value, index);
    //console.log(this.optionSelection);

    if (event.option.value == 'Phone') {
      this.phoneMaskEnable = true;
      this.ssnMaskEnable = false;
    } else if (event.option.value == 'Social Security Number') {
      this.phoneMaskEnable = false;
      this.ssnMaskEnable = true;
    } else {
      this.phoneMaskEnable = false;
      this.ssnMaskEnable = false;
    }
  }

  showMoreRows(ix) {
    //console.log(this.hiddenRows);
    this.hiddenRows[ix+1] = true;
  }

  hideRow(ix) {
    console.log(ix);
    this.hiddenRows[ix] = false;
  }

  filterValues(search: string) {
    return this.valsAsArr.filter(value => value.toLowerCase().indexOf(search.toLowerCase()) >= 0);
  }

  onSubmit(dataForm) {
    console.log(dataForm);
    //this.router.navigateByUrl('/menu-form');
  }

  // custom validator boilerplate
  validateRequired(fieldControlName): ValidatorFn {
    return (control: AbstractControl): {
      [key: string]: any
    } => {
      if (control.value) {
        return null;
      } else {
        return {
          'popd': true
        }
      }
    };
  }

  maskUSPhone(txt) {
    let x = txt.replace(/[^0-9]/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    txt = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

    return txt;
  }

  maskSSN(txt) {
    let x = txt.replace(/[^0-9]/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,4})/);
    txt = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');

    return txt;
  }

  @HostListener("ngModelChange", ["$event"]) onNgModelChange(newValue) {
    //console.log('got it');
    this.elementRef.nativeElement.value = this.maskUSPhone(newValue);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Are you sure?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        window.location.reload();
      }
    });
  }

  spinnerShownFakeOut() {
    this.spinnerShown = true;
    setTimeout(() => {
      this.spinnerShown = false;
    }, 5000);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(FRBBizAttributionComponent, {
      duration: 5000,
    });
  }

  doNothing() {}
}
