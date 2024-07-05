import { SessionService } from "./sessionService.service";
import { environment } from "./../../environments/environment";
import { IChannel } from "./../interfaces/IChannel.interface";
import { Injectable } from "@angular/core";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { Router } from "@angular/router";
import { IStatus } from "../interfaces/IStatus.interface";
import { getDomainFromUrl } from "../utility/getDomainFromUrl";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private appClient: any;

  constructor(
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
}
