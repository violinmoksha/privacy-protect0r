import { Component, OnInit } from '@angular/core';

import { PIMenu } from '../../models/pimenu';

import { ReportGenerationService } from '../../services/report-generation.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  public submitted: boolean = false;
  public model: PIMenu;
  public guidRes: string;

  constructor(private _reportGenerationService: ReportGenerationService) {
    this.model = new PIMenu();
  }

  ngOnInit() {
  }

  onSubmit() {
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

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
