import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GUID } from '../models/guid';

@Injectable({
  providedIn: 'root'
})
export class ReportGenerationService {

  constructor(private http: HttpClient) { }

  getGuid() {
    return this.http.get<GUID>('http://localhost:3000/api/v1/make_guid');
  }
}
