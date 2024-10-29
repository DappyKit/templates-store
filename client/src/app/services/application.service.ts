import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '../constants/api-url.config';
import { dynamicPath } from '../utilities/addParamsToEndpoint';
import { Observable } from 'rxjs';
import { IApplication } from '../interfaces/IApplication';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private _http: HttpClient,
  ) {

  }

  public getApplications(userId: number): Observable<IApplication[]> {
    const path = dynamicPath(ApiPath.USER_APPLICATIONS, userId);
    return this._http.get<IApplication[]>(path);
  }
}
