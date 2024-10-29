import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../constants/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  constructor(
    private _http: HttpClient,
    @Inject(ENVIRONMENT) private environment: any,
   
  ) {

  }

  public getApplications() {
    return this._http.get(`${this.environment.apiUrl}/api/v1/applications`);
  }
}
