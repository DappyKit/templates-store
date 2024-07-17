import { Injectable } from '@nestjs/common';
import { createAppClient, viemConnector } from '@farcaster/auth-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {
    this.initializeAppClient();
  }
  private appClient;

  private initializeAppClient(): any {
    this.appClient = createAppClient({
      ethereum: viemConnector(),
    });
  }

  public async signIn(status: any): Promise<boolean> {
    const domain = this.configService.get<string>('DOMAIN');
    const { nonce, message, signature } = status;
    const { data, success, fid } = await this.appClient.verifySignInMessage({
      message,
      signature,
      domain,
      nonce,
    });

    return success;
  }
}