import { Injectable, inject } from "@angular/core";
import { LOCAL_STORAGE } from "../constants/localStorage.injectionToken";


@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _localStorage: Storage = inject(LOCAL_STORAGE);

  public setItemToLocalStorage(key: string, data: any): void {
    this._localStorage.setItem(key, JSON.stringify(data));
  }

  public getItemFromLocalStorage(key: string): null | any {
    const localStorageData = this._localStorage.getItem(key);
    return localStorageData ? JSON.parse(localStorageData) : null;
  }
}
