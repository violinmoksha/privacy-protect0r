import { Component, OnInit, ChangeDetectorRef, ApplicationRef, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormControlName, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PIValues } from '../../models/pivalues';
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
  public keysAsArr: any = ["first_name", "middle_name", "last_name", "email", "phone", "zipcode", "codeOTheDay", "socialMediaURL", "socialSecurityNumber", "driversLicense", "passportNumber", "passportNation", "age", "otherNamesUsedInThePast", "dx", "rx", "bloodGrp", "governmentFoodSubsistenceV", "nonPciAcctV", "nonPciSecDigitzV"];
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

  public emailCreated: boolean = false;
  public myFormControlName: string = '';

  public fieldLabel: FormControl;
  public dynamicType: string = "text";
  public fieldValFormControlName: string[] = ["first_name"];

  public namePat: string = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  public selectedPattern: string;

  public selectionsChgd: boolean[] = [false];

  @ViewChild('formDir', { static: false }) formDir: FormGroupDirective;
  @ViewChildren('controlDir', { read: ElementRef }) controlDirs: QueryList<ElementRef>;

  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog, private snackBar: MatSnackBar, private fb: FormBuilder, public appRef: ApplicationRef) {
    this.vals = new PIValues();
    this.valsAsArr = [];

    let ct = 0;
    Object.keys(this.vals).forEach(key => {
      this.valsAsArr.push(Object.values(this.vals)[ct++]);
    })

    //console.log(this.keysAsArr);
    //console.log(Object.values(this.vals));
  }

  ngOnInit() {
    this.grp = this.fb.group({
      first_name: ['', Validators.compose([Validators.required, Validators.pattern(this.namePat)])],
      middle_name: ['', Validators.compose([Validators.required, Validators.pattern(this.namePat)])],
      last_name: ['', Validators.compose([Validators.required, Validators.pattern(this.namePat)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
      zipcode: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]{5}$")])],
      codeOTheDay: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]{4}$")])],
      socialMediaURL: ['', Validators.compose([Validators.required])],
      socialSecurityNumber: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      driversLicense: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z0-9]+$")])],
      passportNumber: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z0-9]+$")])],
      passportNation: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z'-]+$")])], // f.e. Cote d'Ivoire
      age: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
      otherNamesUsedInThePast: ['', Validators.compose([Validators.required])],
      dx: ['', Validators.compose([Validators.required])],
      rx: ['', Validators.compose([Validators.required])],
      bloodGrp: ['', Validators.compose([Validators.required])],
      governmentFoodSubsistenceV: ['', Validators.compose([Validators.required])],
      nonPciAcctV: ['', Validators.compose([Validators.required])],
      nonPciSecDigitzV: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]{3}$")])],
    });

    this.fieldLabel = new FormControl('', Validators.compose([Validators.required]));
    this.fieldLabel.valueChanges.subscribe(newValue => {
      this.filteredValues = this.filterValues(newValue);
    });

    this.grp.controls.email.valueChanges.subscribe(val => {
      this.grp.controls.email.updateValueAndValidity();
    })
  }

  ngAfterViewInit(){
    // print array of ElementRef objects
    //console.log(this.controlDirs.toArray());
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

    //this.controlDirPhone.nativeElement.formControlName = 'phone';
    Object.keys(this.vals).forEach(key => {
      if (option == this.vals[key]) {
        //console.log('this.controlDir: '+JSON.stringify(this.controlDirs.toArray()[ix]));
        this.controlDirs.toArray()[ix].nativeElement.formControlName = this.fieldValFormControlName[ix] = key;
        this.controlDirs.toArray()[ix].nativeElement.style = 'background: none !important';
        //this.grp[key].formControlName = this.fieldValFormControlName = key;
        if (key == 'email') {
          //this.controlDir.nativeElement.type = 'email';
        }
      }
    })

    //this.grp.updateValueAndValidity({onlySelf: false});

    if (this.optionsAsCats['HR/PII'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: HR/PII';
    } else if (this.optionsAsCats['Health/PHI'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: Health/PHI';
    } else if (this.optionsAsCats['FinTech/PCI'].indexOf(option) !== -1) {
      this.catSelection[ix] = 'Data Category: FinTech/PCI';
    }

    this.appRef.tick();

    this.cdr.detectChanges();
  }

  onRandomValueChg(event, index) {
    event.target.style = "background: yellow !important; cursor: pointer !important";
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent, index: number) {
    this.selectionsChgd[index] = true;

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
    //console.log(ix);
    this.hiddenRows[ix] = false;
  }

  filterValues(search: string) {
    return this.valsAsArr.filter(value => {
      let exactMatchSearchArr = search.split(' ');
      let anyMatch: boolean = false;
      exactMatchSearchArr.forEach(searchVal => {
        if (searchVal.length > 0) {
          if (value.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0) {
            anyMatch = true;
          }
        }
      });

      // non exact-match, some BigG taxonomy for this at the moment
      if (value.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
        anyMatch = true;
      }

      return anyMatch;
    });
  }

  onSubmit(dataForm) {
    //console.log(dataForm);
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
    }, 2000);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(FRBBizAttributionComponent, {
      duration: 5000,
    });
  }

  denada() {}
}
