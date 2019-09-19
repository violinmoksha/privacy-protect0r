import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GUID } from '../models/guid';

@Injectable({
  providedIn: 'root'
})
export class ReportGenerationService {

  constructor(private http: HttpClient) { }

  getGuid() {
    return this.http.get<GUID>('http://localhost:3000/api/v1/make_guid');
  }

  getReport() {
    let rawParams = {
      "first_nameV":true,
      "first_nameL":true,
      "middle_nameV":false,
      "middle_nameL":true,
      "last_nameV":false,
      "last_nameL":true,
      "emailV":true,
      "emailL":true,
      "phoneV":false,
      "phoneL":true,
      "zipcodeV":false,
      "zipcodeL":true,
      "codeOTheDayV":false,
      "codeOTheDayL":false,
      "socialMediaURLV": false,
      "socialMediaURLL": false,
      "socialSecurityNumberV": false,
      "socialSecurityNumberL": true,
      "driversLicenseV": false,
      "driversLicenseL": true,
      "passportNumberV": false,
      "passportNumberL": true,
      "passportNationV": true,
      "passportNationL": false,
      "ageV": true,
      "ageL": false,
      "otherNamesUsedInThePastV": false,
      "otherNamesUsedInThePastL": true,
      "dxV":false,
      "dxL":true,
      "rxV":false,
      "rxL":true,
      "bloodGrpV":false,
      "bloodGrpL":true,
      "inTheKnowV":true,
      "inTheKnowL":true,
      "compliantPatientV":true,
      "compliantPatientL":true,
      "governmentFoodSubsistenceV": false,
      "governmentFoodSubsistenceL": true,
      "nonPciAcctV":true,
      "nonPciAcctL":true,
      "nonPciSecDigitzV":false,
      "nonPciSecDigitzL":true
    }
    let params = new HttpParams();
    Object.keys(rawParams).forEach((key, value) => {
      params.set(key, value.toString());
    })
    return this.http.post('http://localhost:3000/api/v1/make_report', params, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/xlsx")
    });
  }
}
