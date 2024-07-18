import { Injectable } from '@nestjs/common';
import { createAppClient, viemConnector } from '@farcaster/auth-client';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    this.initializeAppClient();
  }
  private appClient;

  private initializeAppClient(): any {
    this.appClient = createAppClient({
      ethereum: viemConnector(),
    });
  }

  public async signIn(status: any): Promise<boolean> {
    const domain = this._configService.get<string>('DOMAIN');
    const { nonce, message, username, signature, pfpUrl, displayName } = status;
    const { data, success, fid } = await this.appClient.verifySignInMessage({
      message,
      signature,
      domain,
      nonce,
    });

    if (success) {
      this._userService.createUser({id: fid, userName: username, displayName: displayName, photoUrl: pfpUrl});
    }
    return success;
  }
}
