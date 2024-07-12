import { environment } from "./../../environments/environment";
import { IChannel } from "./../interfaces/IChannel.interface";
import { Injectable } from "@angular/core";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { IStatus } from "../interfaces/IStatus.interface";
import { getDomainFromUrl } from "../utility/getDomainFromUrl";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../interfaces/IUser.interface";
import {ApiPath} from "../constants/api-url.config"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private appClient: any;

  constructor(
    private _http: HttpClient
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
        siweUri: environment.url,
        domain: getDomainFromUrl(environment.url),
      });
      const { data } = response;
      console.log('data', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getStatus(token: string): Promise<IStatus> {
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
  }

  public async verifySignInMessage(sessionData: any): Promise<boolean> {
    const { nonce, domain, message, signature } = sessionData;
    const { data, success, fid } = await this.appClient.verifySignInMessage({
      nonce,
      domain: getDomainFromUrl(environment.url),
      message,
      signature,
    });

    return success;
  }

  public login(user: IUser): Observable<any> {
     this._http.post(ApiPath.LOGIN, user);
  }
}
