import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiPath } from "../constants/api-url.config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  constructor(private _http: HttpClient) {}

  public createApp(userId: number, app: any): Observable<any> {
    const body = {
      userId,
      ...app,
    };
    return this._http.post(ApiPath.CREATE_APP, body);
  }
}
