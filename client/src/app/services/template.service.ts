import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  constructor() {}

  public createTemplate(userId: number, app: any) {
    const body = {
      userId,
      ...app,
    };
    console.log("createTemplate", body);
  }
}
