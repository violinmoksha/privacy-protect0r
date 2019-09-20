import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, NgZone } from '@angular/core';

import { PIMenu } from '../../models/pimenu';

import { ReportGenerationService } from '../../services/report-generation.service';

import { saveAs } from 'file-saver';

import { JoyrideService }from 'ngx-joyride';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  public submitted: boolean = false;
  public model: PIMenu;
  public guidRes: string;
  public hrExpanded: boolean = true;
  public healthExpanded: boolean = true;
  public finTechExpanded: boolean = true;

  @ViewChild('first_nameL', { read: true, static: true}) first_nameL: ElementRef;

  constructor(private _reportGenerationService: ReportGenerationService, private _cdr: ChangeDetectorRef, private zone: NgZone, private readonly joyrideService: JoyrideService) {
    this.model = new PIMenu();
  }

  ngOnInit() {
  }

  onSubmit() {
    this._cdr.detectChanges(); // detect any category selections

    // for make_guid
    /*this._reportGenerationService.getGuid()
      .subscribe(data => {
        this.guidRes = data.guid;
        this.submitted = true;

        console.log(this.guidRes);
      });*/

    // for make_report

    this._reportGenerationService.getReport(this.model.first_nameV, this.model.first_nameL, this.model.middle_nameV, this.model.middle_nameL, this.model.last_nameV, this.model.last_nameL, this.model.emailV, this.model.emailL, this.model.phoneV, this.model.phoneL, this.model.zipcodeV, this.model.zipcodeL, this.model.codeOTheDayV, this.model.codeOTheDayL, this.model.socialMediaURLV, this.model.socialMediaURLL, this.model.socialSecurityNumberV, this.model.socialSecurityNumberL, this.model.driversLicenseV, this.model.driversLicenseL, this.model.passportNumberV, this.model.passportNumberL, this.model.passportNationV, this.model.passportNationL, this.model.ageV, this.model.ageL, this.model.otherNamesUsedInThePastV, this.model.otherNamesUsedInThePastL, this.model.dxV, this.model.dxL, this.model.rxV, this.model.rxL, this.model.bloodGrpV, this.model.bloodGrpL, this.model.inTheKnowV, this.model.inTheKnowL, this.model.compliantPatientV, this.model.compliantPatientL, this.model.governmentFoodSubsistenceV, this.model.governmentFoodSubsistenceL, this.model.nonPciAcctV, this.model.nonPciAcctL, this.model.nonPciSecDigitzV, this.model.nonPciSecDigitzL)
      .subscribe(data => {
        let xlsx = new Blob([data], { type: "application/xlsx" });
        let filename = "privacy-report.xlsx";
        saveAs(xlsx, filename);
      })
  }

  joyrideActivate() {
    this.joyrideService.startTour({ steps: ['firstStep', 'secondStep', 'thirdStep', 'fourthStep']});
  }

  hrShowHide(val: boolean) {
    if (this.hrExpanded == true) {
      this.hrExpanded = false;
    } else {
      this.hrExpanded = true;
    }
    this.model.first_nameV = val.toString();
    this.model.first_nameL = val.toString();
    this.model.middle_nameV = val.toString();
    this.model.middle_nameL = val.toString();
    this.model.last_nameV = val.toString();
    this.model.last_nameL = val.toString();
    this.model.emailV = val.toString();
    this.model.emailL = val.toString();
    this.model.phoneV = val.toString()
    this.model.phoneL = val.toString();
    this.model.zipcodeV = val.toString();
    this.model.zipcodeL = val.toString();
    this.model.codeOTheDayV = val.toString();
    this.model.codeOTheDayL = val.toString();
    this.model.socialMediaURLV = val.toString();
    this.model.socialMediaURLL = val.toString();
    this.model.socialSecurityNumberV = val.toString();
    this.model.socialSecurityNumberL = val.toString();
    this.model.driversLicenseV = val.toString();
    this.model.driversLicenseL = val.toString();
    this.model.passportNumberV = val.toString();
    this.model.passportNumberL = val.toString();
    this.model.passportNationV = val.toString();
    this.model.passportNationL = val.toString();
    this.model.ageV = val.toString();
    this.model.ageL = val.toString();
    this.model.otherNamesUsedInThePastV = val.toString();
    this.model.otherNamesUsedInThePastL = val.toString();
  }

  healthShowHide(val: boolean) {
    if (this.healthExpanded == true) {
      this.healthExpanded = false;
    } else {
      this.healthExpanded = true;
    }
    this.model.dxV = val.toString();
    this.model.dxL = val.toString();
    this.model.rxV = val.toString();
    this.model.rxL = val.toString();
    this.model.bloodGrpV = val.toString();
    this.model.bloodGrpL = val.toString();
    this.model.inTheKnowV = val.toString();
    this.model.inTheKnowL = val.toString();
    this.model.compliantPatientV = val.toString();
    this.model.compliantPatientL = val.toString();
    this.model.governmentFoodSubsistenceV = val.toString();
    this.model.governmentFoodSubsistenceL = val.toString();
  }

  finTechShowHide(val: boolean) {
    if (this.finTechExpanded == true) {
      this.finTechExpanded = false;
    } else {
      this.finTechExpanded = true;
    }
    this.model.nonPciAcctV = val.toString();
    this.model.nonPciAcctL = val.toString();
    this.model.nonPciSecDigitzV = val.toString();
    this.model.nonPciSecDigitzL = val.toString();
  }

  /*adjustPosition(hrExpanded: boolean) {
    if (hrExpanded == true) {
      var collapserrow = document.getElementById('collapserrow');
      document.getElementById('collapserrow').remove();
      var ourTbody = document.getElementsByTagName('tbody')[0];
      var newTbodyHtml = '<tr id="collapserrow" #collapserrow>' + collapserrow.innerHTML + '</tr>' + ourTbody.innerHTML;
      ourTbody.innerHTML = newTbodyHtml;
      this.hrExpanded = false;
    } else {
      this.hrExpanded = true;
    }
  }*/

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
