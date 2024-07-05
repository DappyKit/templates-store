import { IStatus } from './IStatus.interface';
export class User {
  public username?: string;
  public fid?: number;
  public bio?: string;
  public displayName?: string;
  public pfpUrl?: string;

  constructor(data: IStatus ) {
    this.bio = data.bio;
    this.fid = data.fid;
    this.username = data.username;
    this.displayName = data.displayName;
    this.pfpUrl = data.pfpUrl;
  }
}

export interface IUser {
  username?: string;
  fid?: number;
  bio?: string;
  displayName?: string;
  pfpUrl?: string;
}
