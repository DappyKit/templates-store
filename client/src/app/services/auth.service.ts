import { IChannel } from "./../interfaces/IChannel.interface";
import { Inject, Injectable } from "@angular/core";
import {
  AppClient,
  createAppClient,
  viemConnector,
} from "@farcaster/auth-client";
import { IStatus } from "../interfaces/IStatus.interface";
import { getDomainFromUrl } from "../utilities/getDomainFromUrl";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../interfaces/IUser.interface";
import { ApiPath } from "../constants/api-url.config";
import { ENVIRONMENT } from "./../constants/environment";
import { MODAL_ID } from "../constants/modal-id";
import { SharedModalService } from "./sharedModal.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private appClient!: AppClient;

  constructor(
    private _http: HttpClient,
    @Inject(ENVIRONMENT) private environment: any,
    private modalService: SharedModalService
  ) {
    this.initializeAppClient();
  }

  private initializeAppClient(): void {
    this.appClient = createAppClient({
      relay: "https://relay.farcaster.xyz",
      ethereum: viemConnector(),
    });
  }

  public async createChannel(): Promise<IChannel> {
    try {
      const response = await this.appClient.createChannel({
        siweUri: this.environment.url,
        domain: getDomainFromUrl(this.environment.url),
      });
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getStatus(token: string): Promise<IStatus> {
    try {
      const status = await this.appClient.watchStatus({
        channelToken: token,
        timeout: 60000,
        interval: 2000,
        onResponse: (d: any) => {
          console.log("Response code:", d);
        },
      });
      const { data } = status;
      return data;
    } catch (err) {
      throw err
    } finally {
      this.modalService.toggle({ id: MODAL_ID.loginComponent, show: false });
    }
  }

  public login(status: IStatus): Observable<IUser> {
    return this._http.post(ApiPath.LOGIN, status);
  }
}
