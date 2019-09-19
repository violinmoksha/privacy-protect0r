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
    this.model = new PIMenu("abcdefghijklmnopqr", true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true);
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
    this._reportGenerationService.getReport()
      .subscribe(data => {
        let xlsx = new Blob([data], { type: "application/xlsx" });
        let filename = "privacy-report.xlsx";
        saveAs(xlsx, filename);
      })
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
