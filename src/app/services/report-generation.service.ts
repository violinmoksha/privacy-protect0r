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

  getReport(first_nameV: string, first_nameL: string, middle_nameV: string, middle_nameL: string, last_nameV: string, last_nameL: string, emailV: string, emailL: string, mailing1V: string, mailing1L: string, mailing2V: string, mailing2L: string, phoneV: string, phoneL: string, zipcodeV: string, zipcodeL: string, codeOTheDayV: string, codeOTheDayL: string, socialMediaURLV: string, socialMediaURLL: string, socialSecurityNumberV: string, socialSecurityNumberL: string, driversLicenseV: string, driversLicenseL: string, passportNumberV: string, passportNumberL: string, passportNationV: string, passportNationL: string, ageV: string, ageL: string, otherNamesUsedInThePastV: string, otherNamesUsedInThePastL: string, dxV: string, dxL: string, rxV: string, rxL: string, bloodGrpV: string, bloodGrpL: string, inTheKnowV: string, inTheKnowL: string, compliantPatientV: string, compliantPatientL: string, governmentFoodSubsistenceV: string, governmentFoodSubsistenceL: string, nonPciAcctV: string, nonPciAcctL: string, nonPciSecDigitzV: string, nonPciSecDigitzL: string)
    {
    const params = new HttpParams({
      fromObject: {
        first_nameV:first_nameV,
        first_nameL:first_nameL,
        middle_nameV:middle_nameV,
        middle_nameL:middle_nameL,
        last_nameV:last_nameV,
        last_nameL:last_nameL,
        emailV:emailV,
        emailL:emailL,
        mailing1V:mailing1V,
        mailing1L:mailing1L,
        mailing2V:mailing2V,
        mailing2L:mailing2L,
        phoneV:phoneV,
        phoneL:phoneL,
        zipcodeV:zipcodeV,
        zipcodeL:zipcodeL,
        codeOTheDayV:codeOTheDayV,
        codeOTheDayL:codeOTheDayL,
        socialMediaURLV:socialMediaURLV,
        socialMediaURLL:socialMediaURLL,
        socialSecurityNumberV:socialSecurityNumberV,
        socialSecurityNumberL:socialSecurityNumberL,
        driversLicenseV:driversLicenseV,
        driversLicenseL:driversLicenseL,
        passportNumberV:passportNumberV,
        passportNumberL:passportNumberL,
        passportNationV:passportNationV,
        passportNationL:passportNationL,
        ageV:ageV,
        ageL:ageL,
        otherNamesUsedInThePastV:otherNamesUsedInThePastV,
        otherNamesUsedInThePastL:otherNamesUsedInThePastL,
        dxV:dxV,
        dxL:dxL,
        rxV:rxV,
        rxL:rxL,
        bloodGrpV:bloodGrpV,
        bloodGrpL:bloodGrpL,
        inTheKnowV:inTheKnowV,
        inTheKnowL:inTheKnowL,
        compliantPatientV:compliantPatientV,
        compliantPatientL:compliantPatientL,
        governmentFoodSubsistenceV: governmentFoodSubsistenceV,
        governmentFoodSubsistenceL: governmentFoodSubsistenceL,
        nonPciAcctV:nonPciAcctV,
        nonPciAcctL:nonPciAcctL,
        nonPciSecDigitzV:nonPciSecDigitzV,
        nonPciSecDigitzL:nonPciSecDigitzL
      }
    });

    return this.http.post('http://localhost:3000/api/v1/make_report?'+params.toString(), {}, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/xlsx")
    });
  }
}
